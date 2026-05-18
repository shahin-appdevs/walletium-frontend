import { fetchers } from "@/lib/api/fetchers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 6);

  try {
    const data = await fetchers.journal.list({ page, perPage });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Failed to load articles" },
      { status: error?.status || 500 },
    );
  }
}
