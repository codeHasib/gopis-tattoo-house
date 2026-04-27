import { ObjectId } from "mongodb";

/**
 * 🎨 Tattoo Model Structure (MongoDB native)
 * This is NOT enforced by MongoDB — only for consistency
 */

export function createTattooModel(data) {
  return {
    title: data.title?.trim() || "",
    price: data.price?.trim() || "",
    description: data.description?.trim() || "",
    mediaUrl: data.mediaUrl || "",
    createdAt: new Date(),
  };
}

/**
 * 🧾 Validate tattoo before insert/update
 */
export function validateTattoo(data) {
  const errors = [];

  if (!data.title) errors.push("Title is required");
  if (!data.price) errors.push("Price is required");
  if (!data.mediaUrl) errors.push("Media URL is required");

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 🔍 Convert string ID → Mongo ObjectId safely
 */
export function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch (error) {
    return null;
  }
}