import Image from "next/image";

export default async function MembersPage() {
  const res = await fetch(`${process.env.BASE_URI}/api/member`, {
    cache: "no-store",
  });

  const data = await res.json();
  const members = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">👥 Our Team</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {members.map((m) => (
          <div key={m._id} className="bg-white p-4 rounded-xl shadow">
            <Image
              height={150}
              width={150}
              alt={m.name}
              src={m.imageUrl}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="font-bold mt-2">{m.name}</h2>

            <p className="text-sm text-gray-600">{m.description}</p>

            <span className="text-xs bg-gray-200 px-2 mt-2 inline-block">
              {m.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
