import { updateMember, deleteMember } from "@/actions/member";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  return Response.json(await updateMember(id, body));
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  return Response.json(await deleteMember(id));
}