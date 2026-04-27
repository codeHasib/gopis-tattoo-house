export default async function BlogPage() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  const data = await res.json();
  const blogs = data?.data || [];

  // helper to detect video
  function isVideo(url = "") {
    return url.match(/\.(mp4|webm|ogg)$/i);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">📝 Tattoo Blog</h1>
        <p className="text-gray-600 mt-2">
          Stories, designs & tattoo updates
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            {/* MEDIA (IMAGE OR VIDEO) */}
            {blog.mediaUrl && (
              <div className="h-52 bg-black">

                {isVideo(blog.mediaUrl) ? (
                  <video
                    src={blog.mediaUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={blog.mediaUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                )}

              </div>
            )}

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="text-xl font-bold mb-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No blogs available yet.
        </div>
      )}

    </div>
  );
}