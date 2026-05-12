import ArtistsCompo from "@/components/public/ArtistsCompo";

const ArtistsPage = async () => {
  const res = await fetch(`${process.env.BASE_URI}/api/artist`, {
    cache: "no-store",
  });

  const data = await res.json();

  const artists = data?.data || [];
  return (
    <div>
      <ArtistsCompo artists={artists}></ArtistsCompo>
    </div>
  );
};

export default ArtistsPage;
