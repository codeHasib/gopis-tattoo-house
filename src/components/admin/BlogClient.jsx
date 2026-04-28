"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, Trash2, Edit3, Film, 
  FileText, ImageIcon, X, Loader2, BookOpen, AlertCircle
} from "lucide-react";

export default function BlogClient() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Edit States
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

    // ✅ PRE-UPLOAD VALIDATION
    if (!title || !description || !file) {
      alert("All fields are required");
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      alert("Only image or video allowed");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const upload = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await upload.json();

      if (!uploadData.success) throw new Error("Media upload failed");

      await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          mediaUrl: uploadData.url,
        }),
      });

      setTitle("");
      setDescription("");
      setFile(null);
      loadBlogs();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this story?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
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

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-white">Studio Stories</h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide">Publish news, tattoo care tips, and studio updates</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
          <BookOpen size={18} className="text-zinc-400" />
          <span className="text-sm font-bold text-zinc-300">{blogs.length} Posts Published</span>
        </div>
      </header>

      {/* CREATE BLOG FORM */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Plus className="text-black" size={22} />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">Draft New Post</h2>
          </div>

          <form onSubmit={handleCreate} className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">Article Title</label>
                <input
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white transition-all text-white outline-none"
                  placeholder="The Art of Healing..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">Content Body</label>
                <textarea
                  rows={6}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-white transition-all text-white outline-none resize-none"
                  placeholder="Share the story behind the art..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="group flex-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-2 block ml-1">Cover Media (Image/Video)</label>
                <label className="relative flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-black border-2 border-dashed border-zinc-800 rounded-3xl cursor-pointer hover:border-zinc-400 transition-all group overflow-hidden">
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      {file.type.startsWith("video/") ? <Film className="text-blue-500" /> : <ImageIcon className="text-green-500" />}
                      <span className="text-white font-bold text-sm">{file.name}</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="text-zinc-700 mx-auto mb-3" size={32} />
                      <p className="text-zinc-500 text-sm font-medium">Drop media here</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </div>

              <button 
                disabled={loading}
                className="w-full h-16 bg-white text-black font-black uppercase italic rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 mt-5"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : "Publish Story"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6">
        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Archives</h3>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-zinc-400 transition-all text-white"
          />
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((b) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={b._id}
              className="bg-zinc-900/10 border border-zinc-800 rounded-[2.5rem] overflow-hidden group hover:border-zinc-700 transition-all"
            >
              <div className="relative h-64 w-full bg-black">
                {b.mediaUrl?.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={b.mediaUrl} className="w-full h-full object-cover" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                ) : (
                  <Image src={b.mediaUrl} alt={b.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter line-clamp-1">{b.title}</h2>
                </div>
              </div>

              <div className="p-8">
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">"{b.description}"</p>
                <div className="flex gap-3">
                  <button onClick={() => openEdit(b)} className="flex-1 bg-zinc-900 text-white py-3 rounded-xl hover:bg-white hover:text-black transition-all font-black text-xs uppercase flex items-center justify-center gap-2">
                    <Edit3 size={14} /> Update
                  </button>
                  <button onClick={() => handleDelete(b._id)} className="w-12 h-12 flex items-center justify-center bg-red-950/10 border border-red-900/30 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditId(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] w-full max-w-xl relative z-10">
              <button onClick={() => setEditId(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X size={28} /></button>
              <h2 className="text-3xl font-black mb-8 uppercase italic text-white tracking-tighter">Edit Post</h2>
              <div className="space-y-6">
                <input className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-white" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                <textarea rows={6} className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-white resize-none" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                <button onClick={handleUpdate} className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-zinc-100 transition-all uppercase italic">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}