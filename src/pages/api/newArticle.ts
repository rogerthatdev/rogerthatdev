const { MongoClient } = require("mongodb");
const { UUID } = require("bson");

// Replace the following with your Atlas connection string
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  pkFactory: { createPk: () => new UUID().toBinary() },
});

async function run() {
  try {
    // Connect to the Atlas cluster
    await client.connect();

    // Get the database and collection on which to run the operation
    const db = client.db("roger_that_posts");
    const col = db.collection("posts");

    // Create new documents
    const mockDocument = {
      title: "Test title",
      slug: "test_title", // for clean URLs
      summary: "A test summary of the article",
      content: `
                # Test Article
                This is a test article content.
                * list
                * of
                * items
                
                ## Subheading
                More content here.
                
                \`\`\`
                console.log("This is a code block");
                \`\`\`
                `,
      tags: ["gcp", "mock", "genai"],
      author: "Roger That Dev",
      published: false,
    };

    const result = await col.insertOne(mockDocument);
    console.log(`Inserted with _id: ${result.insertedId})`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
