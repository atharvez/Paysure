import { connectDB } from "@/lib/db";
import Group from "@/models/Group";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { getUserFromCookies, authErrorResponse } from "@/lib/auth";
import { NextResponse } from "next/server";
import { simplifyDebts } from "@/utils/simplify";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserFromCookies();
    if (!userId) return authErrorResponse();

    const { id } = await params;

    await connectDB();
    const group = await Group.findById(id);
    if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (!group.members.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const transactions = await Transaction.find({ groupId: id }).sort({ createdAt: -1 });

    // Calculate balances for each user
    const balancesMap = new Map<string, number>();

    // Initialize map
    group.members.forEach((m: any) => balancesMap.set(m.toString(), 0));

    transactions.forEach((tx) => {
      // The payer's balance increases by the total amount they paid
      const payerId = tx.payer.toString();
      balancesMap.set(payerId, (balancesMap.get(payerId) || 0) + tx.amount);

      // Everyone who was split owes money, so their balance decreases
      tx.splits.forEach((split: { userId: string; amount: number }) => {
        const splitUserId = split.userId.toString();
        balancesMap.set(splitUserId, (balancesMap.get(splitUserId) || 0) - split.amount);
      });
    });

    const balancesList = Array.from(balancesMap).map(([uId, amount]) => ({
      userId: uId,
      amount,
    }));

    const simplifiedDebts = simplifyDebts(balancesList);

    // Fetch user details to enhance response
    const membersList = await User.find({ _id: { $in: group.members } }).select("name email");
    
    // Map simplified debts with actual names
    const enrichedDebts = simplifiedDebts.map(debt => ({
      from: {
         id: debt.from,
         name: membersList.find(m => m._id.toString() === debt.from)?.name || 'Unknown'
      },
      to: {
         id: debt.to,
         name: membersList.find(m => m._id.toString() === debt.to)?.name || 'Unknown'
      },
      amount: debt.amount
    }));

    return NextResponse.json({
      group,
      members: membersList,
      transactions,
      simplifiedDebts: enrichedDebts,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
