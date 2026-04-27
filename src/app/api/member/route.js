import { addMember, getMembers } from "@/actions/member";

export async function POST(req) {
  const body = await req.json();
  return Response.json(await addMember(body));
}

export async function GET() {
  return Response.json(await getMembers());
}