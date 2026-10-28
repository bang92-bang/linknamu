import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(profile.links.map((link) => link.id));

export async function GET() {
  try {
    return NextResponse.json(await getClickCounts());
  } catch (error) {
    console.error("[clicks] GET failed", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const linkId = body?.linkId;

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const saved = await incrementClick(linkId);
    if (!saved) {
      return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[clicks] POST failed", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
