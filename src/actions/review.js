import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

/**
 * 🧠 VALIDATION
 */
function validateReview(data) {
  if (!data.name || !data.message || !data.rating) {
    return {
      valid: false,
      message: "All fields are required",
    };
  }

  if (data.rating < 1 || data.rating > 5) {
    return {
      valid: false,
      message: "Rating must be between 1 and 5",
    };
  }

  return { valid: true };
}

/**
 * ➕ CREATE REVIEW (PUBLIC)
 */
export async function addReview(data) {
  try {
    const validation = validateReview(data);

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    const db = await connectDB();

    const review = {
      name: data.name,
      message: data.message,
      rating: Number(data.rating),
      status: "pending", // 👈 IMPORTANT
      createdAt: new Date(),
    };

    await db.collection("reviews").insertOne(review);

    return {
      success: true,
      message: "Review submitted for approval",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * 📥 GET APPROVED REVIEWS (PUBLIC)
 */
export async function getApprovedReviews() {
  const db = await connectDB();

  const reviews = await db
    .collection("reviews")
    .find({ status: "approved" })
    .sort({ createdAt: -1 })
    .toArray();

  return {
    success: true,
    data: reviews,
  };
}

/**
 * 📥 GET ALL REVIEWS (ADMIN)
 */
export async function getAllReviews() {
  const db = await connectDB();

  const reviews = await db
    .collection("reviews")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return {
    success: true,
    data: reviews,
  };
}

/**
 * ✅ APPROVE REVIEW
 */
export async function approveReview(id) {
  const db = await connectDB();

  await db.collection("reviews").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "approved" } }
  );

  return { success: true };
}

/**
 * ❌ DELETE REVIEW
 */
export async function deleteReview(id) {
  const db = await connectDB();

  await db.collection("reviews").deleteOne({
    _id: new ObjectId(id),
  });

  return { success: true };
}