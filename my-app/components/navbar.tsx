"use client";

import Link from "next/link";
import { Zap, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-2">
        <Zap className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Paysure</h1>
      </div>

      <div className="flex items-center gap-6 font-medium">
        <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link href="/groups" className="text-slate-600 hover:text-blue-600 transition-colors">Groups</Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-full font-semibold transition-all"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </nav>
  );
}