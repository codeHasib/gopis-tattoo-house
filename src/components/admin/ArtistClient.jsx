"use client";

import { useEffect, useState } from "react";

export default function ArtistClient() {
  const [artists, setArtists] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadArtists();
  }, []);

  async function loadArtists() {
    const res = await fetch("/api/artist");
    const data = await res.json();

    if (data.success) setArtists(data.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 🧠 VALIDATION (IMPORTANT)
    if (!name || !description || !file) {
      alert("All fields are required");
      return;
    }

    // upload image
    const formData = new FormData();
    formData.append("file", file);

    const upload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await upload.json();

    if (!uploadData.success) {
      alert("Upload failed");
      return;
    }

    await fetch("/api/artist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        imageUrl: uploadData.url,
      }),
    });

    setName("");
    setDescription("");
    setFile(null);

    loadArtists();
  }

  async function handleDelete(id) {
    await fetch(`/api/artist/${id}`, {
      method: "DELETE",
    });

    loadArtists();
  }

  function openEdit(a) {
    setEditId(a._id);
    setEditData(a);
  }

  async function handleUpdate() {
    await fetch(`/api/artist/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setEditId(null);
    loadArtists();
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Artists Admin</h1>

      {/* CREATE */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">

        <input
          className="border p-2 w-full"
          placeholder="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="bg-black text-white px-4 py-2">
          Add Artist
        </button>

      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">

        {artists.map((a) => (
          <div key={a._id} className="border p-4">

            <img
              src={a.imageUrl}
              className="w-full h-40 object-cover"
            />

            <h2 className="font-bold">{a.name}</h2>
            <p className="text-sm">{a.description}</p>

            <div className="flex gap-2 mt-2">

              <button
                onClick={() => openEdit(a)}
                className="bg-blue-500 text-white px-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(a._id)}
                className="bg-red-500 text-white px-2"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-4 w-96">

            <input
              className="border p-2 w-full mb-2"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-2"
              value={editData.description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description: e.target.value,
                })
              }
            />

            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white w-full py-2"
            >
              Save
            </button>

          </div>

        </div>
      )}

    </div>
  );
}