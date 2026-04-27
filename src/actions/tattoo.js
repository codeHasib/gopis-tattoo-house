import { connectDB } from "@/lib/db";

/**
 * 🧠 Tattoo "schema" (structure reference only)
 * MongoDB is schema-less, but we define structure for consistency
 */
export const TATTOO_SCHEMA = {
  title: "",
  price: "",
  description: "",
  mediaUrl: "",
  createdAt: new Date(),
};

/**
 * ➕ Add a new tattoo
 */
export async function addTattoo(data) {
  try {
    const db = await connectDB();

    const newTattoo = {
      title: data.title,
      price: data.price,
      description: data.description,
      mediaUrl: data.mediaUrl,
      createdAt: new Date(),
    };

    const result = await db.collection("tattoos").insertOne(newTattoo);

    return {
      success: true,
      message: "Tattoo added successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add tattoo",
      error: error.message,
    };
  }
}

/**
 * 📥 Get all tattoos (for customer page)
 */
export async function getTattoos() {
  try {
    const db = await connectDB();

    const tattoos = await db
      .collection("tattoos")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: tattoos,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch tattoos",
      error: error.message,
    };
  }
}

/**
 * 🔍 Get single tattoo by ID
 */
export async function getTattooById(id) {
  try {
    const db = await connectDB();

    const tattoo = await db.collection("tattoos").findOne({ _id: id });

    return {
      success: true,
      data: tattoo,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch tattoo",
      error: error.message,
    };
  }
}

/**
 * ❌ Delete tattoo
 */
export async function deleteTattoo(id) {
  try {
    const db = await connectDB();

    const result = await db.collection("tattoos").deleteOne({ _id: id });

    return {
      success: true,
      message: "Tattoo deleted successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete tattoo",
      error: error.message,
    };
  }
}