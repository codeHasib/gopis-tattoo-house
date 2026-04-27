import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

let client;
let clientPromise;

// Prevent multiple connections in development (VERY important)
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

// Export a helper to use DB anywhere
export async function connectDB() {
  const client = await clientPromise;
  const db = client.db(); // default DB from URI
  return db;
}