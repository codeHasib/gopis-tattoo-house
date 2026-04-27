import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

/**
 * 🧠 VALIDATION
 */
function validateMember(data) {
  if (!data.name || !data.description || !data.role || !data.imageUrl) {
    return {
      valid: false,
      message: "All fields (name, description, role, image) are required",
    };
  }

  return { valid: true };
}

/**
 * ➕ CREATE MEMBER
 */
export async function addMember(data) {
  try {
    const validation = validateMember(data);

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    const db = await connectDB();

    const member = {
      name: data.name,
      description: data.description,
      role: data.role,
      imageUrl: data.imageUrl,
      createdAt: new Date(),
    };

    const result = await db.collection("members").insertOne(member);

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
 * 📥 GET MEMBERS
 */
export async function getMembers() {
  try {
    const db = await connectDB();

    const members = await db
      .collection("members")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: members,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * ✏️ UPDATE
 */
export async function updateMember(id, data) {
  try {
    const db = await connectDB();

    await db.collection("members").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: data.name,
          description: data.description,
          role: data.role,
          imageUrl: data.imageUrl,
        },
      }
    );

    return {
      success: true,
      message: "Member updated",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * ❌ DELETE
 */
export async function deleteMember(id) {
  try {
    const db = await connectDB();

    await db.collection("members").deleteOne({
      _id: new ObjectId(id),
    });

    return {
      success: true,
      message: "Member deleted",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}