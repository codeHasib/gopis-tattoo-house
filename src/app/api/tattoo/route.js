import { addTattoo } from "@/actions/tattoo";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await addTattoo(body);

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create tattoo",
        error: error.message,
      },
      { status: 500 }
    );
  }
}