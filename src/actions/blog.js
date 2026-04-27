import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

/**
 * ➕ CREATE BLOG
 */
export async function addBlog(data) {
  try {
    const db = await connectDB();

    const blog = {
      title: data.title,
      description: data.description,
      mediaUrl: data.mediaUrl,
      createdAt: new Date(),
    };

    const result = await db.collection("blogs").insertOne(blog);

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * 📥 GET ALL BLOGS
 */
export async function getBlogs() {
  try {
    const db = await connectDB();

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: blogs,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * ✏️ UPDATE BLOG
 */
export async function updateBlog(id, data) {
  try {
    const db = await connectDB();

    await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: data.title,
          description: data.description,
          mediaUrl: data.mediaUrl,
        },
      }
    );

    return {
      success: true,
      message: "Blog updated",
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * ❌ DELETE BLOG
 */
export async function deleteBlog(id) {
  try {
    const db = await connectDB();

    await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    return {
      success: true,
      message: "Blog deleted",
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}