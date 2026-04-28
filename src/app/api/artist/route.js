import { addArtist, getArtists } from "@/actions/artist";

export const dynamic = "force-dynamic";

// CREATE + READ
export async function POST(req) {
  const body = await req.json();
  return Response.json(await addArtist(body));
}

export async function GET() {
  return Response.json(await getArtists());
}