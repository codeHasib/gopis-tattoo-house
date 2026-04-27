"use client";

import { useEffect, useState } from "react";

export default function MemberClient() {
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("artist");
  const [file, setFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const res = await fetch("/api/member");
    const data = await res.json();

    if (data.success) setMembers(data.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ VALIDATION
    if (!name || !description || !role || !file) {
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

    await fetch("/api/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        role,
        imageUrl: uploadData.url,
      }),
    });

    setName("");
    setDescription("");
    setRole("artist");
    setFile(null);

    loadMembers();
  }

  async function handleDelete(id) {
    await fetch(`/api/member/${id}`, {
      method: "DELETE",
    });

    loadMembers();
  }

  function openEdit(member) {
    setEditId(member._id);
    setEditData(member);
  }

  async function handleUpdate() {
    await fetch(`/api/member/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    setEditId(null);
    loadMembers();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Members Admin</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">

        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="artist">Artist</option>
          <option value="member">Member</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="bg-black text-white px-4 py-2">
          Add Member
        </button>

      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">

        {members.map((m) => (
          <div key={m._id} className="border p-4">

            <img
              src={m.imageUrl}
              className="w-full h-40 object-cover"
            />

            <h2 className="font-bold">{m.name}</h2>

            <p className="text-sm">{m.description}</p>

            <span className="text-xs bg-gray-200 px-2">
              {m.role}
            </span>

            <div className="flex gap-2 mt-2">

              <button
                onClick={() => openEdit(m)}
                className="bg-blue-500 text-white px-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(m._id)}
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

            <select
              className="border p-2 w-full mb-2"
              value={editData.role}
              onChange={(e) =>
                setEditData({ ...editData, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="artist">Artist</option>
              <option value="member">Member</option>
            </select>

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