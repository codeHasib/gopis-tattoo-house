import { updateArtist, deleteArtist } from "@/actions/artist";

// UPDATE
export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  return Response.json(await updateArtist(id, body));
}

// DELETE
export async function DELETE(req, { params }) {
  const { id } = await params;

  return Response.json(await deleteArtist(id));
}