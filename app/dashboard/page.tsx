"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import PieChartComp from "@/components/piechart";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [meRes, txRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/transactions")
        ]);

        if (!meRes.ok) {
          router.push("/login");
          return;
        }

        const meData = await meRes.json();
        const txData = await txRes.json();
        
        setUser(meData);
        setTransactions(txData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Calculate generic dashboard balances
  let totalSpent = 0;
  const categoryMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    // Determine how much the user actually spent (their split amount)
    const mySplit = tx.splits.find((s: any) => s.userId === user._id);
    if (mySplit) {
      totalSpent += mySplit.amount;
      
      const cat = tx.category || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + mySplit.amount;
    }
  });

  const pie = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
           <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name}</h1>
           <button 
             onClick={() => router.push('/transactions/new')}
             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md active:scale-95"
           >
             + Add Transaction
           </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 font-medium">Total Spent</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">₹{totalSpent}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 font-medium">Transactions</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{transactions.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 font-medium">Monthly Estimate</p>
            <h2 className="text-3xl font-extrabold text-amber-500 mt-2">₹{totalSpent > 0 ? (totalSpent + 1200) : 0}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pb-20">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Spending by Category</h3>
             {pie.length > 0 ? (
               <PieChartComp data={pie} />
             ) : (
               <p className="text-slate-500 text-center py-10">No transactions recorded yet.</p>
             )}
          </div>
          
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Transactions</h3>
             {transactions.length > 0 ? (
               <div className="space-y-4">
                 {transactions.slice(0, 5).map((tx, idx) => {
                    const mySplit = tx.splits.find((s: any) => s.userId === user._id);
                    return (
                     <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                       <div>
                         <p className="font-semibold text-slate-800">{tx.category || "Expense"}</p>
                         <p className="text-sm text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                       </div>
                       <span className="font-bold text-red-500">-₹{mySplit?.amount || 0}</span>
                     </div>
                   );
                 })}
               </div>
             ) : (
               <p className="text-slate-500 text-center py-10">No recent transactions.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}