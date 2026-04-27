"use client";

import { useState } from "react";

export default function AdminTattooPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error("Upload failed");
      }

      const mediaUrl = uploadData.url;

      const res = await fetch("/api/tattoo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          description,
          mediaUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Tattoo added successfully ✅");

        setTitle("");
        setPrice("");
        setDescription("");
        setFile(null);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen text-black bg-gray-50 flex items-center justify-center p-6">
      
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          🎨 Add New Tattoo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Tattoo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Price */}
          <input
            type="text"
            placeholder="Price (e.g. 2000 BDT)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            rows={4}
          />

          {/* File */}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Tattoo"}
          </button>

        </form>
      </div>
    </div>
  );
}