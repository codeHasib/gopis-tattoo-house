import { getTattoos } from "@/actions/tattoo";

export default async function TattooGalleryPage() {
  const res = await getTattoos();
  const tattoos = res?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Tattoo Gallery
      </h1>

      {tattoos.length === 0 ? (
        <p className="text-center text-gray-500">
          No tattoos available yet.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {tattoos.map((tattoo) => (
            <div
              key={tattoo._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              
              {/* Image */}
              <div className="h-64 bg-gray-100">
                <img
                  src={tattoo.mediaUrl}
                  alt={tattoo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {tattoo.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {tattoo.description}
                </p>

                <p className="text-black font-bold">
                  💰 {tattoo.price}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}