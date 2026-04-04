import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { calculateBalances } from "@/utils/balance";
import { simplifyDebts } from "@/utils/simplify";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("groupId");

  const txs = await Transaction.find({ groupId });

  const balances = calculateBalances(txs);
  const result = simplifyDebts(balances);

  return NextResponse.json(result);
}