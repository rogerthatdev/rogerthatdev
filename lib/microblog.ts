import type { QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { getDb } from "./firebase-admin";

export interface Microblog {
  id: string;
  slug: string;
  text: string;
  category: string;
  createdAt: Date | null;
}

function toDate(value: Timestamp | undefined): Date | null {
  return value ? value.toDate() : null;
}

function docToMicroblog(doc: QueryDocumentSnapshot): Microblog {
  const data = doc.data();
  return {
    id: doc.id,
    slug: data.slug ?? doc.id,
    text: data.text ?? "",
    category: data.category ?? "",
    createdAt: toDate(data.createdAt),
  };
}

export async function getRecentMicroblogs(count: number): Promise<Microblog[]> {
  try {
    const snapshot = await getDb()
      .collection("microblog")
      .orderBy("createdAt", "desc")
      .limit(count)
      .get();

    return snapshot.docs.map(docToMicroblog);
  } catch (error) {
    console.error("Failed to fetch microblog notes from Firestore", error);
    return [];
  }
}
