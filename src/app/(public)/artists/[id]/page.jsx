import ArtistDetailsCompo from "@/components/public/ArtistDetailsCompo";

const ArtistDetails = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.BASE_URI}/api/artist`, {
    cache: "no-store",
  });

  const data = await res.json();

  const artists = data?.data || [];

  const theArtist = artists.find((item) => item._id == id);

  return (
    <div>
      <ArtistDetailsCompo theArtist={theArtist}></ArtistDetailsCompo>
    </div>
  );
};

export default ArtistDetails;
