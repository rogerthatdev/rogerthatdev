import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const PROJECT_ID = "roger-that-dev";
const FIRESTORE_DATABASE_ID = "blog";

function getAdminApp() {
  const [existing] = getApps();
  if (existing) return existing;

  return initializeApp({
    credential: applicationDefault(),
    projectId: PROJECT_ID,
  });
}

export function getDb() {
  return getFirestore(getAdminApp(), FIRESTORE_DATABASE_ID);
}
