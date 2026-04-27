"use client";

import { useEffect, useState } from "react";

export default function BlogClient() {
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    const res = await fetch("/api/blog");
    const data = await res.json();

    if (data.success) setBlogs(data.data);
  }

  async function handleCreate(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const upload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await upload.json();

    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        mediaUrl: uploadData.url,
      }),
    });

    if (!title) {
      alert("Please give a title");
      return;
    }

    if (!description) {
      alert("Please give description");
      return;
    }

    if (!file) {
      alert("Please select an image or video");
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      alert("Only image or video allowed");
      return;
    }

    setTitle("");
    setDescription("");
    setFile(null);

    loadBlogs();
  }

  async function handleDelete(id) {
    await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });

    loadBlogs();
  }

  function openEdit(blog) {
    setEditId(blog._id);
    setEditData(blog);
  }

  async function handleUpdate() {
    await fetch(`/api/blog/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setEditId(null);
    loadBlogs();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Admin</h1>

      {/* CREATE */}
      <form onSubmit={handleCreate} className="space-y-3 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="bg-black text-white px-4 py-2">Add Blog</button>
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {blogs.map((b) => (
          <div key={b._id} className="border p-4">
            {b.mediaUrl && (
              <div className="w-full h-40 bg-black">
                {b.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={b.mediaUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={b.mediaUrl}
                    className="w-full h-full object-cover"
                    alt={b.title}
                  />
                )}
              </div>
            )}

            <h2 className="font-bold">{b.title}</h2>
            <p>{b.description}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEdit(b)}
                className="bg-blue-500 text-white px-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(b._id)}
                className="bg-red-500 text-white px-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT */}
      {editId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 w-96">
            <input
              className="border p-2 w-full"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full"
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
