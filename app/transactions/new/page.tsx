"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default function NewTransaction() {
  const router = useRouter();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch("/api/groups")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setGroups(data);
        if (data.length > 0) setGroupId(data[0]._id);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!groupId || !amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount and select a group.");
      setProcessing(false);
      return;
    }

    try {
      // First fetch the selected group to get all members for an equal split
      const grpRes = await fetch(`/api/groups/${groupId}`);
      if (!grpRes.ok) throw new Error("Failed to fetch group members");
      
      const grpData = await grpRes.json();
      const numAmount = parseFloat(amount);
      const membersCount = grpData.members.length;
      const splitAmount = numAmount / membersCount;
      
      const splits = grpData.members.map((m: any) => ({
         userId: m._id,
         amount: splitAmount
      }));

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          amount: numAmount,
          category,
          splits,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add transaction");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 mt-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Add New Expense</h2>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-medium">{error}</div>}

          {groups.length === 0 ? (
            <div className="text-center py-10">
               <p className="text-slate-600 mb-4">You need to be in a group to add a shared expense.</p>
               <button onClick={() => router.push("/groups")} className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold">Go to Groups</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Group</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  required
                >
                  {groups.map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">* The expense will be split equally among all members of the selected group.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="e.g. 500"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dinner at Cafe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="pt-4 flex gap-4">
                 <button
                   type="button"
                   onClick={() => router.back()}
                   className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold py-3 px-4 rounded-xl transition-all"
                   disabled={processing}
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   disabled={processing}
                   className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                 >
                   {processing ? "Saving..." : <><PlusCircle className="h-5 w-5" /> Save Transaction</>}
                 </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
