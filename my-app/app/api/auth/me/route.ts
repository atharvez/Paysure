import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromCookies, authErrorResponse } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    await connectDB();
    const user = await User.findById(userId).select("-password");

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
