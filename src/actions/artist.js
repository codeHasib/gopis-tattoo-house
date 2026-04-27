import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

/**
 * 🧠 VALIDATION
 */
function validateArtist(data) {
  if (!data.name || !data.description || !data.imageUrl) {
    return {
      valid: false,
      message: "Name, description and image are required",
    };
  }

  return { valid: true };
}

/**
 * ➕ CREATE ARTIST
 */
export async function addArtist(data) {
  try {
    const validation = validateArtist(data);

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    const db = await connectDB();

    const artist = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      createdAt: new Date(),
    };

    const result = await db.collection("artists").insertOne(artist);

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * 📥 GET ALL ARTISTS
 */
export async function getArtists() {
  try {
    const db = await connectDB();

    const artists = await db
      .collection("artists")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: artists,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * ✏️ UPDATE ARTIST
 */
export async function updateArtist(id, data) {
  try {
    const db = await connectDB();

    await db.collection("artists").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
        },
      }
    );

    return {
      success: true,
      message: "Artist updated",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * ❌ DELETE ARTIST
 */
export async function deleteArtist(id) {
  try {
    const db = await connectDB();

    await db.collection("artists").deleteOne({
      _id: new ObjectId(id),
    });

    return {
      success: true,
      message: "Artist deleted",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}