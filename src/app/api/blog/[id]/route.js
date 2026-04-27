import { updateBlog, deleteBlog } from "@/actions/blog";

// UPDATE
export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  return Response.json(await updateBlog(id, body));
}

// DELETE
export async function DELETE(req, { params }) {
  const { id } = await params;

  return Response.json(await deleteBlog(id));
}