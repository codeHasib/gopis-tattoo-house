import { addTattoo, getTattoos } from "@/actions/tattoo";

export const dynamic = "force-dynamic";

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

// 🔥 ADD THIS (READ ALL TATTOOS)
export async function GET() {
  try {
    const result = await getTattoos();

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch tattoos",
        error: error.message,
      },
      { status: 500 }
    );
  }
}