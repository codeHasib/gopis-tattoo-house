import { approveReview, deleteReview } from "@/actions/review";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  const { id } = await params;
  return Response.json(await approveReview(id));
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return Response.json(await deleteReview(id));
}