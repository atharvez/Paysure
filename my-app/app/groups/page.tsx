"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Users } from "lucide-react";

export default function Groups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGroupName, setNewGroupName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/groups")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newGroupName }),
    });

    if (res.ok) {
      const g = await res.json();
      setGroups([...groups, g]);
      setNewGroupName("");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Your Groups</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {groups.map((group) => (
            <Link key={group._id} href={`/groups/${group._id}`}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">{group.name}</h3>
                </div>
                <p className="text-slate-500 text-sm">{group.members.length} member(s)</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Create New Group</h2>
          <form onSubmit={handleCreateGroup} className="flex gap-4">
             <input
                type="text"
                placeholder="Trip to Goa, Apartment Rent..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
             />
             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                <PlusCircle className="h-5 w-5" /> Add
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}