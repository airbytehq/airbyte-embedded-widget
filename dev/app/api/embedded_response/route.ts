import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log("Received widget response:", data);

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Error processing widget response:", error);
    return NextResponse.json({ error: "Failed to process response" }, { status: 500 });
  }
}
