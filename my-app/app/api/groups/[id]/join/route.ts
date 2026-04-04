import { connectDB } from "@/lib/db";
import Group from "@/models/Group";
import { getUserFromCookies, authErrorResponse } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    const { id } = await params;

    await connectDB();
    const group = await Group.findById(id);
    
    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    return NextResponse.json({ message: "Joined successfully", groupId: group._id });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
