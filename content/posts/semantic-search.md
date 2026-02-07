+++
date = '2026-02-06T16:22:29-08:00'
draft = true
title = "Semantic Search: Finding meaning with AI"
tags = ["semantic-search", "ai", "101", "explainer"]
+++

## A match made in SQL

If you're looking for something in a regular ol' database, a keyword search could do the trick. 

```sql
SELECT *
FROM dogs
WHERE breed = 'greyhound';
```

This example assumes a pretty basic table of dog breeds with a couple of descriptive columns. The `WHERE` clause is direct about what it should return: any record where the `breed` column is "greyhound".

| id | breed | avg_weight_lbs | type | notes |
|----|-------|----------------|------|-------|
| 239 | greyhound | 80 | sighthound | Greyhound. Calm, gentle, often low-energy indoors despite their speed |

Maybe we want something that's kind of like a greyhound. We can loosen up the `WHERE` to give us records where the breed is *like* "greyhound". Or in other words, all records where the word "greyhound" appears in the `breed` column:

```sql
SELECT *
FROM dogs
WHERE breed ILIKE '%greyhound%';
```

And this would return an extra match:

| id | breed | avg_weight_lbs | type | notes |
|----|-------|----------------|------|-------|
| 239 | greyhound | 80 | sighthound | Greyhound. Calm, gentle, often low-energy indoors despite their speed |
| 323 | italian greyhound | 14 | sighthound | Italian Greyhound. Affectionate, gentle, and sensitive dogs that bond closely with their people |

But things aren't always that simple. Maybe you're looking for a dog breed that's **skinny and fast** (like a greyhound). We're not talking about keyword matches anymore. We're talking about something more *meaningful*. We need to do a **semantic search**, and it's something that a **vector database** does very well.

## Finding meaning...

So, "skinny and fast" huh? Here are some results from a **vector database** of dog breeds, with **embeddings** generated using an AI model:

| id | breed | avg_weight_lbs | type | notes |
|----|-------|----------------|------|-------|
| 239 | greyhound | 80 | sighthound | Greyhound. Calm, gentle, often low-energy indoors despite their speed |
| 108 | azawakh | 45 | sighthound | Azawakh. Extremely lean, alert sighthound with strong independence and loyalty |
| 101 | whippet | 35 | sighthound | Whippet. Quiet, affectionate, and athletic with short bursts of speed and a relaxed indoor temperament |

This seems wrong. None of these results include the word "skinny" or "fast". Why?

Well, a **vector database** is able to move beyond the language of words and on to the proximity of meaning by using a **text embedding model.** A text embedding model can discern that the meaning of *skinny and fast* can be inferred from the notes of each row returned.

Using the example above, it's able to take a numerical representation (called a **text embedding**) of the words "skinny and fast" and use it to find a close match of the numerical representation of the text in the `notes` column. Instead of matching on keywords, we can match on semantic similarity.

A quick way to see semantic similarity in action: Ask your favorite AI chat to guess one word you're thinking of based on 5 related words or phrases. See how close it gets to the word you're thinking. Here's a prompt to start with.

```
Your job is to guess the single word I'm thinking of.
I will provide 5 related words or phrases.
Respond with one word only.
```
