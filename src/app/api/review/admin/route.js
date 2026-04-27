import { getAllReviews } from "@/actions/review";

export async function GET() {
  return Response.json(await getAllReviews());
}