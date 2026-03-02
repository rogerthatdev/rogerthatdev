+++
date = '2026-03-02T08:25:51-08:00'
draft = true
title = 'Fast Path: Your First Vector Database with Google Cloud AlloyDB'
tags = ["semantic search", "vector databases", "ai", "tutorial", "Google Cloud"]
nowplaying = "Baby Keem - Ca$ino"
+++

# Fast Path: Your First Vector Database with Google Cloud AlloyDB

If you’ve ever tried any vector database platforms like [Pinecone](http://pinecone.io/) or [Qdrant](https://qdrant.tech/), you know how quickly you’re able to get a vector database up and running. It can take a little more effort to do the same on Google Cloud. 

I’m going to lay out a fast path to deploying a vector database with some sample data on Google Cloud with AlloyDB. All steps can be completed in the Google Cloud Console without having to set up a local development environment or establish a direct connection to your AlloyDB instance.   

## Before we can start

We’ll need a few things before we get started:

**A Google Cloud project with billing enabled.**  A valid billing account is required to use a lot of Google Cloud services. We’ll be using one of the smallest available machines to keep costs as low as possible.  

**Owner permissions on the project.** The Owner role is generally not recommended, but for learning purposes we’ll use it to complete the steps. I’ll make a separate post about the IAM roles we’d use if we want to apply the principle of least privilege.  

**Enabled APIs and services.** To complete the steps below, enable the following APIs on the Google Cloud project:

* [AlloyDB API](https://console.cloud.google.com/apis/library/alloydb.googleapis.com)  
* [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com)   
* [Compute Engine API](https://console.cloud.google.com/apis/library/compute.googleapis.com)  
* [Service Networking API](https://console.cloud.google.com/apis/library/servicenetworking.googleapis.com)

**Sample data.** [Here is a CSV file](https://github.com/rogerthatdev/vector-alloydb/blob/main/products_truncated.csv) of 2,000 products of a mock online store. We’ll be using the product descriptions to generate vector embeddings and perform a semantic search.  

## 1\. Create a 1vCPU prototyping cluster

We’ll start on the [AlloyDB Get Started page](https://console.cloud.google.com/alloydb) where there are a few options for clusters we could create. Since we’re prototyping, click **Create 1vCPU cluster.**  
![][image1]  
This will load up a template that will deploy the smallest machine available for the C4A machine series in a single availability zone.  Fill out the following fields:

**Cluster ID:** vector-prototype  
**Password:** Click **Generate** to autofill in a secure password string. We’ll need this later, so keep this value safe somewhere.

Keep the rest of the configuration set to their default values. 

Click **Confirm network setup** to enable a private services access connection on our default VPC.  That will take between 1 and 2 minutes. Once it completes, click **Create cluster** to create an AlloyDB cluster. When it finishes, the **Overview** page for the cluster will load.  

## 2\. Create a new database

New clusters include a default database called `postgres`. Let’s create our own. There isn’t a way to do that in the console. Instead, we have to use the in-console **AlloyDB Studio**. A link to AlloyDB Studio can be found in the left side navigation pane of the **Overview** page, under the magnifying glass icon. It will ask us to log in to our database.  
![][image2]

For **Database**, we’ll select the default postgres and choose **Built-in database authentication** as the authentication method. We’ll use the default user `postgres` and the cluster password we set when we created the cluster.

Once we’re in AlloyDB Studio, we can run the following query to create a new database in our cluster:

```sql
CREATE DATABASE myvectordb;
```

At the top left of the AlloyDB Studio Explorer panel, click the ![][image3] icon to switch over to the new database. We can use the same default built-in database authentication that we did to log into the `postgres` database.

## 3\. Install required extensions

By default, our database does not have any AI functionality to support a vector database. For that, we have to install the vector and alloydb\_scann extensions:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS alloydb_scann;
```

The `vector` extension is an AlloyDB-customized version of the stock pgvector PostgreSQL extension. The `alloydb_scann` extension lets us implement highly efficient indexing using the ScaNN algorithm. Together, they enhance our ordinary postgreSQL database so that it can store and query vector embeddings.   

## 4\. Create a table with a vector embedding column

We’ve got a database, but now we need a table to store our data. Since we’re going to import data from a CSV file in the next step, we have to make sure that the order of the columns and their types match those in the sample `csv` file: 

```sql
CREATE TABLE "public"."products" (
 "id" BIGINT NOT NULL,
 "category" TEXT,
 "name" TEXT,
 "brand" TEXT,
 "retail_price" NUMERIC,
 "department" TEXT,
 "sku" TEXT,
 "product_description" TEXT,
 "product_description_embedding" vector(3072) 
 GENERATED ALWAYS AS (embedding('gemini-embedding-001', product_description))
 STORED
);
```

The `product_description_embedding` column will be a vector with 3072 dimensions generated with the `gemini-embedding-001` text embedding model applied to the `product_description` column.  

## 5\. Import data

Back on the Overview page, click the **Import** button at the top of the page. Select CSV as file format, and then choose **Upload files from your computer**. Click **Browse** to select the local test data file.

Click the second **Browse** link to select Cloud Storage location to upload the sample CSV file to. If one doesn’t exist we can create a new bucket by clicking the new bucket icon at the top of the bucket selection pane. Give it a universally unique name and click **Create** then **Select**.  

Next choose the database `myvectordb` and the table `products`, and click **Import**.

This will take a few minutes. When it’s done, our `products` table will have 2,000 rows, each with a generated text embedding in the last column.  

## 6\. Create an index

At this point, we could perform a semantic search. However, generating an index will pre-organize our vector embeddings and allow similarity searches on millions of rows.

```sql
-- Generating the index requires more maintenance work memory than the default setting allows.
SET maintenance_work_mem = '400MB';

CREATE INDEX IF NOT EXISTS idx_product_description_embedding ON products
USING ScaNN (product_description_embedding cosine)
-- The optimal number of leaves is roughly the square root of the number of rows in the table.
WITH (num_leaves=173);
```

## 7\. Do a semantic search

With text embeddings and ScaNN index in place we can now do a semantic search on our data. This example query combines a keyword filter on the `category` column with a semantic search query.

```sql
SELECT * FROM products
WHERE category = 'Outerwear & Coats'
ORDER BY
  product_description_embedding <=> CAST(embedding('gemini-embedding-001', 'lightweight puffer jackets for hiking') AS vector)
LIMIT 5;
```

The result we get back should be 5 rows, each one matching the search term provided in the query.

## What next?

The steps I’ve shared are dependent on the sample data that I provide at the top of the tutorial, but they have everything you might need to apply it to our own data. Everything here was done from the Google Cloud Console. If you have a preferred client, like pgadmin, or an application you want to connect to the database, check out the [documentation for setting up a connection to AlloyDB](https://docs.cloud.google.com/alloydb/docs/choose-alloydb-connectivity).  


[image1]: 

[image2]: 

[image3]: 