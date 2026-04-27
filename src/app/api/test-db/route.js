import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectDB();

    // Just test connection by listing collections
    const collections = await db.listCollections().toArray();

    return Response.json({
      success: true,
      message: "MongoDB connected successfully 🚀",
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "MongoDB connection failed ❌",
      error: error.message,
    });
  }
}