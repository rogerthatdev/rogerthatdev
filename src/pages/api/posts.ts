import { MongoClient } from "mongodb";
import { UUID } from "bson";
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import * as crypto from "crypto";

// Disable the default body parser to access the raw request body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to buffer the request stream
async function buffer(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Check for required environment variables
if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}
if (!process.env.GITHUB_WEBHOOK_SECRET) {
  throw new Error("Missing GITHUB_WEBHOOK_SECRET in environment variables");
}

const uri = process.env.MONGODB_URI;
const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
const options = {
  pkFactory: { createPk: () => new UUID().toBinary() },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Cache the MongoDB client connection in development to prevent issues with HMR
if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, it's safe to simply connect
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const signature = req.headers["x-hub-signature-256"] as string;

    if (!signature) {
      return res.status(401).json({ message: "Missing signature" });
    }

    const hmac = crypto.createHmac("sha256", webhookSecret);
    const digest = "sha256=" + hmac.update(buf).digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");

      const newPost = JSON.parse(buf.toString());
      const result = await col.insertOne({ ...newPost });

      return res.status(201).json({
        message: "Article created successfully",
        id: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating article:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");
      const slug = req.query.slug as string;
      const post = await col.findOne({ slug });

      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
