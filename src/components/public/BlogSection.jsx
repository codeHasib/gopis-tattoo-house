import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";

export default async function BlogSection() {
  // 1. Fetching data from your API (assuming Server Component environment)
  const res = await fetch(`${process.env.BASE_URI}/api/blog`, {
    cache: "no-store",
  });

  const data = await res.json();
  const allBlogs = data?.data || [];

  // 2. Logic: Show ONLY the first 6 blogs for the homepage
  const blogs = allBlogs.slice(0, 6);

  // 3. Helper to detect video (Matches your logic)
  function isVideo(url = "") {
    return url.match(/\.(mp4|webm|ogg)$/i);
  }

  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden">
      {/* 4. Background Ghost Text Decoration */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none select-none z-0">
        <h3 className="text-[300px] font-black uppercase tracking-tighter leading-none text-zinc-300">
          JOURNAL
        </h3>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs">
              Latest Stories
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mt-4 text-white leading-none">
              Ink <br /> Culture
            </h2>
          </div>
          
          {/* Main "All Blogs" Button */}
          <Link 
            href="/blogs"
            className="group flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs border border-zinc-800 hover:bg-[#E11D5C] transition-all duration-300 shadow-2xl"
          >
            Explore All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5. BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {blogs.map((blog, i) => {
            // Logic to alternate large and small cards for a dynamic "magazine" feel
            const isLarge = i === 0 || i === 3 || i === 4;
            // CORRECTED: Using blog.mediaUrl here
            const hasVideo = isVideo(blog.mediaUrl); 

            return (
              <Link 
                key={blog._id} 
                href={`/blogs/${blog._id}`}
                className={`group relative overflow-hidden rounded-[40px] bg-zinc-950 border border-zinc-900 h-[400px] md:h-[450px] flex flex-col transition-all duration-500 hover:border-[#E11D5C]/40 ${
                  isLarge ? "md:col-span-4" : "md:col-span-2"
                }`}
              >
                {/* MEDIA LAYER */}
                <div className="absolute inset-0 z-0 h-full w-full">
                  {hasVideo ? (
                    // FIX: autoPlay + muted + playsInline are required for autoplay to work
                    <video
                      src={blog.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-700"
                    />
                  ) : (
                    <img
                      src={blog.mediaUrl || "/blog-placeholder.jpg"}
                      alt={blog.title}
                      className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-700"
                    />
                  )}
                  {/* Subtle Gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* CONTENT LAYER */}
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#E11D5C] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                      {blog.category || "Lifestyle"}
                    </span>
                    {hasVideo && <Video className="text-white/40" size={20} />}
                  </div>

                  <div>
                    <h3 className={`font-black uppercase tracking-tighter text-white leading-tight mb-4 ${
                      isLarge ? "text-3xl md:text-6xl" : "text-xl md:text-2xl"
                    }`}>
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                      <span>{blog.author || "By Gopis"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 6. Empty State Logic */}
        {blogs.length === 0 && (
          <div className="text-center text-zinc-600 uppercase font-black tracking-widest text-lg py-32 border-2 border-dashed border-zinc-900 rounded-3xl mt-10 bg-zinc-950">
            Journal entries are <br /> being crafted.
          </div>
        ) }
      </div>
    </section>
  );
}