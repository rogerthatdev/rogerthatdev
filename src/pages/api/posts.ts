import { MongoClient } from "mongodb";
import { UUID } from "bson";
import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  pkFactory: { createPk: () => new UUID().toBinary() },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await client.connect();
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");
      const newPost = req.body;
      const result = await col.insertOne({ ...newPost });

      res.status(201).json({
        message: "Article created successfully",
        id: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating article:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    //read from database by slug
    try {
      await client.connect();
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");
      const slug = req.query.slug as string;
      const post = await col.findOne({ slug });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
      return;
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
