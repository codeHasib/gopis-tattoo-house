import { connectDB } from "@/lib/db";
import { toObjectId } from "@/models/tattoo.model";

export const dynamic = "force-dynamic";

// ❌ DELETE
export async function DELETE(req, { params }) {
  try {
    const db = await connectDB();

    // 🔥 FIX HERE
    const { id } = await params;

    const objectId = toObjectId(id);

    if (!objectId) {
      return Response.json({
        success: false,
        message: "Invalid ID",
      });
    }

    await db.collection("tattoos").deleteOne({
      _id: objectId,
    });

    return Response.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
}

// ✏️ UPDATE
export async function PUT(req, { params }) {
  try {
    const db = await connectDB();

    // 🔥 FIX HERE
    const { id } = await params;

    const objectId = toObjectId(id);

    const body = await req.json();

    const updateData = {
      ...(body.title && { title: body.title }),
      ...(body.price && { price: body.price }),
      ...(body.description && { description: body.description }),
      ...(body.mediaUrl && { mediaUrl: body.mediaUrl }),
    };

    await db.collection("tattoos").updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    return Response.json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
}