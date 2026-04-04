import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { getUserFromCookies, authErrorResponse } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    await connectDB();

    // Fetch transactions where user is payer or in splits
    const transactions = await Transaction.find({
      $or: [
        { payer: userId },
        { "splits.userId": userId }
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    await connectDB();
    const data = await req.json();

    if (!data.groupId || !data.amount || !data.splits) {
      return NextResponse.json({ error: "Missing fields required for transaction" }, { status: 400 });
    }

    const tx = await Transaction.create({
      ...data,
      payer: data.payer || userId, // default to self if not provided
      createdAt: new Date(),
    });

    return NextResponse.json(tx);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}