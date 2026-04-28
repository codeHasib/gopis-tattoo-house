"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  User,
  Image as ImageIcon,
  X,
  Loader2,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function MemberClient() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("artist");
  const [file, setFile] = useState(null);

  // Edit States
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
    if (!name || !description || !role || !file) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const upload = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await upload.json();

      if (!uploadData.success) throw new Error("Upload failed");

      await fetch("/api/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to remove this member?")) return;
    await fetch(`/api/member/${id}`, { method: "DELETE" });
    loadMembers();
  }

  function openEdit(member) {
    setEditId(member._id);
    setEditData(member);
  }

  async function handleUpdate() {
    await fetch(`/api/member/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditId(null);
    loadMembers();
  }

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
            Members Registry
          </h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide">
            Manage access and roles for Gopis Tattoo House
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
          <ShieldCheck size={18} className="text-zinc-400" />
          <span className="text-sm font-bold text-zinc-300">
            {members.length} Total Members
          </span>
        </div>
      </header>

      {/* ADD MEMBER FORM */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5">
              <Plus className="text-black" size={22} />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">
              Add New Member
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">
                  Member Name
                </label>
                <input
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white transition-all text-white outline-none"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">
                  System Role
                </label>
                <select
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white transition-all text-white outline-none appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="artist">Artist (Portfolio Access)</option>
                  <option value="member">Member (Basic Access)</option>
                </select>
              </div>
            </div>

            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">
                Description / Notes
              </label>
              <textarea
                rows={5}
                className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white transition-all text-white outline-none resize-none"
                placeholder="Brief bio or role notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">
                Staff Avatar
              </label>
              <label className="flex-1 flex flex-col items-center justify-center bg-black border-2 border-dashed border-zinc-800 rounded-2xl cursor-pointer hover:border-zinc-500 transition-all group p-4 min-h-[140px]">
                {file ? (
                  <div className="text-center">
                    <span className="text-sm text-white font-bold block truncate max-w-[150px]">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase mt-1">
                      Ready to upload
                    </span>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="text-zinc-700 mb-2" size={24} />
                    <span className="text-xs text-zinc-600">Select Image</span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              <button
                disabled={loading}
                className="w-full bg-white text-black font-black uppercase py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Finalize Entry"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6">
        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">
          Current Staff
        </h3>
        <div className="relative max-w-sm w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-zinc-400 transition-all text-white"
          />
        </div>
      </div>

      {/* MEMBER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((m) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={m._id}
              className="group bg-zinc-900/10 border border-zinc-800 rounded-[2rem] overflow-hidden hover:border-zinc-600 transition-colors"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={m.imageUrl}
                  alt={m.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full">
                    {m.role}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
                  {m.name}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 italic h-10">
                  {m.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(m)}
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-100 hover:text-black text-white py-3 rounded-xl transition-all font-bold text-xs uppercase"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="w-12 flex items-center justify-center bg-red-950/20 border border-red-900/30 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editId && (
          <div className="fixed inset-0 z-[100] flex justify-center items-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-lg relative z-10"
            >
              <button
                onClick={() => setEditId(null)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-black mb-8 uppercase italic text-white">
                Update Staff Entry
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">
                      Name
                    </label>
                    <input
                      className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-white text-white"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">
                      Role
                    </label>
                    <select
                      className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-white text-white appearance-none"
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="artist">Artist</option>
                      <option value="member">Member</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-white text-white resize-none"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleUpdate}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all mt-4 uppercase italic"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
