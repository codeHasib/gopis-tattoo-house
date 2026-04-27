import { addReview, getApprovedReviews } from "@/actions/review";

// PUBLIC CREATE
export async function POST(req) {
  const body = await req.json();
  return Response.json(await addReview(body));
}

// PUBLIC GET
export async function GET() {
  return Response.json(await getApprovedReviews());
}