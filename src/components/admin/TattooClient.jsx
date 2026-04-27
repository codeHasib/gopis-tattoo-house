"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function TattooClient() {
  const [tattoos, setTattoos] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  // ---------------- LOAD (USES YOUR getTattoos()) ----------------
  useEffect(() => {
    loadTattoos();
  }, []);

  async function loadTattoos() {
    const res = await fetch("/api/tattoo");
    const data = await res.json();

    if (data.success) {
      setTattoos(data.data); // 👈 IMPORTANT: your action returns "data"
    }
  }

  // ---------------- CREATE ----------------
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadData.success) {
      alert("Upload failed");
      return;
    }

    await fetch("/api/tattoo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        mediaUrl: uploadData.url,
      }),
    });

    setForm({ title: "", price: "", description: "" });
    setFile(null);

    loadTattoos();
  }

  // ---------------- DELETE ----------------
  async function handleDelete(id) {
    await fetch(`/api/tattoo/${id}`, {
      method: "DELETE",
    });

    loadTattoos();
  }

  // ---------------- OPEN EDIT ----------------
  function openEdit(t) {
    setEditId(t._id);
    setEditForm({
      title: t.title,
      price: t.price,
      description: t.description,
    });
  }

  // ---------------- UPDATE ----------------
  async function handleUpdate() {
    await fetch(`/api/tattoo/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    setEditId(null);
    loadTattoos();
  }

  async function logout() {
    await authClient.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Tattoo Admin</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CREATE FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6 space-y-3">

        <input
          className="border w-full p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="border w-full p-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <textarea
          className="border w-full p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="bg-black text-white w-full py-2">
          Add Tattoo
        </button>

      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {tattoos.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded">

            <img
              src={t.mediaUrl}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="font-bold">{t.title}</h2>
            <p>{t.price}</p>
            <p className="text-sm text-gray-500">
              {t.description}
            </p>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => openEdit(t)}
                className="bg-blue-500 text-white px-3 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-4 w-96">

            <input
              className="border w-full p-2 mb-2"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />

            <input
              className="border w-full p-2 mb-2"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
            />

            <textarea
              className="border w-full p-2 mb-2"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
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

            <button
              onClick={() => setEditId(null)}
              className="bg-gray-400 text-white w-full py-2 mt-2"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}