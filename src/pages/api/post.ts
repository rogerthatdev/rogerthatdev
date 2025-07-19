import { MongoClient } from "mongodb";
import { UUID } from "bson";
import type { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  pkFactory: { createPk: () => new UUID().toBinary() },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await client.connect();
    const db = client.db("roger_that_posts");
    const col = db.collection("posts");
    const newPost = req.body;
    const result = await col.insertOne({ ...newPost });

    res
      .status(201)
      .json({ message: "Article created successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
