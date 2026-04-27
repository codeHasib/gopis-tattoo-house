import { addBlog, getBlogs } from "@/actions/blog";

// CREATE
export async function POST(req) {
  const body = await req.json();
  return Response.json(await addBlog(body));
}

// READ
export async function GET() {
  return Response.json(await getBlogs());
}