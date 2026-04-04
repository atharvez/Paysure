import { connectDB } from "@/lib/db";
import Group from "@/models/Group";
import { getUserFromCookies, authErrorResponse } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    await connectDB();
    const groups = await Group.find({ members: userId });
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    await connectDB();
    const { name } = await req.json();

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const group = await Group.create({
      name,
      members: [userId],
    });

    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
