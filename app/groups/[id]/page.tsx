"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { Copy, PlusCircle, ArrowRightLeft } from "lucide-react";

export default function GroupDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // new expense state
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/groups/${id}`)
      .then(res => res.json())
      .then(resData => {
         if(resData.error) throw new Error();
         setData(resData);
         setLoading(false);
      })
      .catch(() => router.push("/groups"));
  }, [id, router]);

  const handleJoinUrl = () => {
    const url = `${window.location.origin}/groups/join/${id}`;
    navigator.clipboard.writeText(url);
    alert("Invite link copied to clipboard!");
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!amount || !data) return;

    const numAmount = parseFloat(amount);
    
    // Equal split among all members
    const membersCount = data.members.length;
    const splitAmount = numAmount / membersCount;
    
    const splits = data.members.map((m: any) => ({
       userId: m._id,
       amount: splitAmount
    }));

    const rx = await fetch("/api/transactions", {
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify({
          groupId: id,
          amount: numAmount,
          category,
          splits
       })
    });

    if(rx.ok) {
       window.location.reload(); // naive reload for speed
    }
  };

  if(loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 pb-24 pt-6 px-6">
         <div className="max-w-6xl mx-auto flex justify-between items-center text-white mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight">Paysure</h1>
             <button onClick={() => router.push("/dashboard")} className="text-sm font-medium opacity-80 hover:opacity-100">Back to Dashboard</button>
         </div>
         <div className="max-w-6xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-2">{data.group.name}</h2>
            <div className="flex items-center gap-4 text-slate-300">
               <p>{data.members.length} members</p>
               <button onClick={handleJoinUrl} className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs transition-colors">
                 <Copy className="h-3 w-3"/> Copy Invite Link
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-16 grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-6">
            {/* ADD EXPENSE */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold text-slate-800 mb-4">Add Expense</h3>
               <form onSubmit={handleAddExpense} className="flex gap-4">
                  <input type="number" placeholder="Amount (₹)" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                  <input type="text" placeholder="Category" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" value={category} onChange={(e) => setCategory(e.target.value)} required />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                     <PlusCircle className="h-5 w-5"/> Split
                  </button>
               </form>
               <p className="mt-3 text-xs text-slate-500">* Expenses are currently split equally among all members.</p>
            </div>

            {/* TRANSACTIONS */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold text-slate-800 mb-4">Group Expenses</h3>
               <div className="space-y-4">
                  {data.transactions.length > 0 ? data.transactions.map((tx:any) => (
                      <div key={tx._id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl border border-slate-50">
                          <div>
                              <p className="font-bold text-slate-800 text-lg">{tx.category}</p>
                              <p className="text-slate-500 text-sm">Paid by {data.members.find((m:any) => m._id === tx.payer)?.name || 'Unknown'} • {new Date(tx.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="font-extrabold text-slate-800 whitespace-nowrap">₹{tx.amount}</span>
                      </div>
                  )) : <p className="text-slate-500 py-10 text-center">No expenses recorded here yet.</p>}
               </div>
            </div>
         </div>

         <div className="space-y-6">
            {/* DSA WHO OWES WHO */}
            <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ArrowRightLeft className="h-5 w-5"/> Simplified Debts</h3>
               <p className="text-indigo-200 text-sm mb-6">Using smart algorithms to minimize transactions.</p>
               
               <div className="space-y-4">
                  {data.simplifiedDebts.length > 0 ? data.simplifiedDebts.map((debt:any, idx: number) => (
                      <div key={idx} className="bg-white/10 p-4 rounded-2xl">
                          <p className="text-sm opacity-90">{debt.from.name} owes {debt.to.name}</p>
                          <p className="text-2xl font-extrabold mt-1">₹{debt.amount.toFixed(2)}</p>
                      </div>
                  )) : (
                      <div className="bg-white/10 p-6 rounded-2xl text-center">
                          <p className="font-semibold">All Settled Up!</p>
                      </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}