import { MongoClient } from "mongodb";
import { UUID } from "bson";
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateArticleSchema, CreateArticle } from "@/types/article";

// Validate that MongoDB connection string is provided in environment variables
if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

// Store the MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Create MongoDB client instance with custom primary key factory
// This ensures each new document gets a unique UUID as its _id
const client = new MongoClient(uri, {
  pkFactory: { createPk: () => new UUID().toBinary() },
});

// Main API handler function for /api/posts endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  // Handle POST requests - Create new blog posts
  if (req.method === "POST") {
    try {
      // Validate the request body against the CreateArticleSchema
      const parsed = CreateArticleSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
      }
      const article: CreateArticle = parsed.data;


      // Establish connection to MongoDB
      await client.connect();
      
      // Get reference to the database and collection
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");

      // enforce that the slug is unique
      const existing = await col.findOne({ slug: article.slug });
      if (existing) return res.status(409).json({ message: "Slug already exists" });

      const doc = {
        ...article,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await col.insertOne(doc);
      return res.status(201).json({ id: result.insertedId, slug: article.slug });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error creating article:", error);
      
      // Return internal server error to the client
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // Always close the database connection, even if an error occurred
      await client.close();
    }
  } 
  // Handle GET requests - Retrieve blog posts by slug
  else if (req.method === "GET") {
    try {
      // Establish connection to MongoDB
      await client.connect();
      
      // Get reference to the database and collection
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");
      
      // Extract the slug from query parameters (e.g., /api/posts?slug=my-article)
      const slug = req.query.slug as string;
      
      // Search for a post with the matching slug
      const post = await col.findOne({ slug });
      
      // If post is found, return it with 200 status
      if (post) {
        res.status(200).json(post);
      } else {
        // If no post is found, return 404 Not Found
        res.status(404).json({ message: "Post not found" });
      }
      
      // Return early to prevent further execution
      return;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error fetching article:", error);
      
      // Return internal server error to the client
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // Always close the database connection, even if an error occurred
      await client.close();
    }
  } 
  // Handle unsupported HTTP methods
  else {
    // Return 405 Method Not Allowed for any other HTTP methods
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
