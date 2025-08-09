import { MongoClient } from "mongodb";
import { UUID } from "bson";
import type { NextApiRequest, NextApiResponse } from "next";

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
      // Establish connection to MongoDB
      await client.connect();
      
      // Get reference to the database and collection
      const db = client.db("roger_that_posts");
      const col = db.collection("posts");
      
      // Extract the new post data from the request body
      const newPost = req.body;
      
      // Insert the new post into the database
      // The spread operator (...) ensures we don't modify the original req.body
      const result = await col.insertOne({ ...newPost });

      // Return success response with the newly created post's ID
      res.status(201).json({
        message: "Article created successfully",
        id: result.insertedId,
      });
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
