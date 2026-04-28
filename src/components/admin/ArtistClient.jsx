"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Trash2, Edit3, Image as ImageIcon, X, Loader2, Users } from "lucide-react";

export default function ArtistClient() {
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!name || !description || !file) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const upload = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await upload.json();

      if (!uploadData.success) throw new Error("Upload failed");

      await fetch("/api/artist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, imageUrl: uploadData.url }),
      });

      setName("");
      setDescription("");
      setFile(null);
      loadArtists();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this artist from the studio records?")) return;
    await fetch(`/api/artist/${id}`, { method: "DELETE" });
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

  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Team Portal</h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide">Registry of Gopis Tattoo House Master Artists</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
          <Users size={18} className="text-zinc-400" />
          <span className="text-sm font-bold">{artists.length} Active Artists</span>
        </div>
      </header>

      {/* 2. Registration Form Section (No Overlapping) */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Plus className="text-black" size={20} />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tight">Register New Artist</h2>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">Full Name</label>
                <input
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-white"
                  placeholder="Artist's Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">Professional Bio</label>
                <textarea
                  rows={4}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-white resize-none"
                  placeholder="Specializations, style, and experience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">Portfolio Avatar</label>
                <label className="relative flex flex-col items-center justify-center w-full h-full min-h-[180px] bg-black border-2 border-dashed border-zinc-800 rounded-3xl cursor-pointer hover:border-zinc-400 transition-all group overflow-hidden">
                  {file ? (
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                      <ImageIcon size={20} /> {file.name}
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="text-zinc-700 mx-auto mb-3" size={32} />
                      <p className="text-zinc-500 text-sm font-medium">Drop profile image here</p>
                      <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-widest">JPG, PNG, WEBP</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </div>

              <button 
                disabled={loading}
                className="w-full h-16 bg-white text-black font-black uppercase italic rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <>Complete Registration <Plus size={20} /></>}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* 3. Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-10">
        <h3 className="text-xl font-black uppercase italic tracking-tighter">Current Roster</h3>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input
            type="text"
            placeholder="Search by artist name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-zinc-400 transition-all backdrop-blur-sm"
          />
        </div>
      </div>

      {/* 4. Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArtists.map((a) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={a._id}
              className="bg-black border border-zinc-800 rounded-[2.5rem] overflow-hidden group hover:border-zinc-600 transition-colors"
            >
              <div className="relative h-72 w-full">
                <Image
                  src={a.imageUrl}
                  alt={a.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-3xl font-black uppercase italic tracking-tighter text-white">{a.name}</h4>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-zinc-500 text-sm leading-relaxed italic line-clamp-3">
                  "{a.description}"
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => openEdit(a)}
                    className="flex-1 h-12 flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl hover:bg-white hover:text-black transition-all font-black text-xs uppercase"
                  >
                    <Edit3 size={14} /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="w-12 h-12 flex items-center justify-center bg-red-950/10 border border-red-900/30 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. Edit Modal */}
      <AnimatePresence>
        {editId && (
          <div className="fixed inset-0 z-[100] flex justify-center items-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] w-full max-w-xl relative z-10"
            >
              <button onClick={() => setEditId(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white">
                <X size={28} />
              </button>

              <h2 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-white">Modify Profile</h2>

              <div className="space-y-6">
                <input
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-white transition-all"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <textarea
                  rows={6}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-white transition-all resize-none"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
                <button
                  onClick={handleUpdate}
                  className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-zinc-200 transition-all shadow-xl uppercase italic tracking-tighter"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}