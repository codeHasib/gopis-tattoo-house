"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  X,
  LogOut,
  Check,
} from "lucide-react";
import Image from "next/image";

export default function TattooClient() {
  const [tattoos, setTattoos] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    loadTattoos();
  }, []);

  async function loadTattoos() {
    const res = await fetch("/api/tattoo");
    const data = await res.json();
    if (data.success) {
      setTattoos(data.data);
    }
  }

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
      body: JSON.stringify({ ...form, mediaUrl: uploadData.url }),
    });

    setForm({ title: "", price: "", description: "" });
    setFile(null);
    loadTattoos();
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this piece?")) return;
    await fetch(`/api/tattoo/${id}`, { method: "DELETE" });
    loadTattoos();
  }

  function openEdit(t) {
    setEditId(t._id);
    setEditForm({ title: t.title, price: t.price, description: t.description });
  }

  async function handleUpdate() {
    await fetch(`/api/tattoo/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditId(null);
    loadTattoos();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-4 md:p-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Tattoo Gallery
          </h1>
          <p className="text-zinc-500 text-sm">
            Manage and showcase your studio's latest art.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* CREATE FORM - LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-md sticky top-10 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2 text-white font-semibold">
              <Plus size={20} className="text-zinc-400" />
              <span>Add New Masterpiece</span>
            </div>

            <input
              className="w-full bg-zinc-950/50 border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-zinc-500 transition-all text-sm"
              placeholder="Design Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <input
              className="w-full bg-zinc-950/50 border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-zinc-500 transition-all text-sm"
              placeholder="Estimated Price (e.g. $200)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />

            <textarea
              className="w-full bg-zinc-950/50 border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-zinc-500 transition-all text-sm min-h-[100px]"
              placeholder="Describe the style, artist, or time taken..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <div className="relative group">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-zinc-800 rounded-xl cursor-pointer group-hover:border-zinc-600 transition-all text-zinc-500 group-hover:text-zinc-300"
              >
                <ImageIcon size={20} />
                <span className="text-sm font-medium">
                  {file ? file.name : "Select Tattoo Image"}
                </span>
              </label>
            </div>

            <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              Publish Art
            </button>
          </form>
        </motion.div>

        {/* LIST - RIGHT COLUMN */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {tattoos.map((t, index) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900/20 border border-zinc-800/50 rounded-3xl overflow-hidden group hover:border-zinc-700 transition-all shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    {console.log(t.mediaUrl)}
                    <Image
                      src={t.mediaUrl}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={t.title}
                    />
                  </div>

                  <div className="p-5 space-y-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {t.title}
                    </h2>
                    <p className="text-sm text-zinc-500 line-clamp-2 min-h-[40px]">
                      {t.description}
                    </p>

                    <h3 className="">Price:- ${t.price}</h3>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openEdit(t)}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800/50 hover:bg-zinc-700 text-white py-2.5 rounded-xl transition-all text-sm font-medium"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(t._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-950/10 hover:bg-red-950/30 text-red-500 py-2.5 rounded-xl transition-all text-sm font-medium border border-red-500/10"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Edit Masterpiece
                </h3>
                <button
                  onClick={() => setEditId(null)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 ml-1">Title</label>
                  <input
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white focus:outline-none focus:border-zinc-500"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 ml-1">Price</label>
                  <input
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white focus:outline-none focus:border-zinc-500"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 ml-1">
                    Description
                  </label>
                  <textarea
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white focus:outline-none focus:border-zinc-500 min-h-[120px]"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setEditId(null)}
                    className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold hover:bg-zinc-700 transition-all"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
