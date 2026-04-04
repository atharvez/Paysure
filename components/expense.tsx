"use client";

import { useState } from "react";

export default function ExpenseModal({ onClose }: any) {
  const [amount, setAmount] = useState("");

  const submit = async () => {
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        payer: "user1",
        groupId: "group1",
        splits: [
          { userId: "user1", amount: 50 },
          { userId: "user2", amount: 50 },
        ],
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="font-bold mb-2">Add Expense</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}