import { fetchers } from "@/lib/api/fetchers";
import { NextResponse } from "next/server";

/**
 * Paginated journal listing filtered by category id.
 *
 * Query params:
 *   - id        (required) category id
 *   - page      (optional, default 1)
 *   - per_page  (optional, default 6)
 *
 * Mirrors the existing /api/journal route shape (POST) so the client-side
 * `loadMore` path can swap between them without restructuring its fetch logic.
 */
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 6);

  if (!id) {
    return NextResponse.json(
      { message: "Missing category id" },
      { status: 400 },
    );
  }

  try {
    const data = await fetchers.journal.category(id, {
      lang: "en",
      page,
      perPage,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Failed to load category" },
      { status: error?.status || 500 },
    );
  }
}
