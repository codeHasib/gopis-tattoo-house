export default async function ArtistsPage() {
  const res = await fetch(`${process.env.BASE_URI}/api/artist`, {
    cache: "no-store",
  });

  const data = await res.json();
  const artists = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">🎨 Our Artists</h1>
        <p className="text-gray-600 mt-2">
          Meet the people behind the ink
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {artists.map((artist) => (
          <div
            key={artist._id}
            className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <div className="h-60 overflow-hidden bg-black">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 text-center">

              <h2 className="text-xl font-bold">
                {artist.name}
              </h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {artist.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {artists.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No artists added yet.
        </div>
      )}

    </div>
  );
}