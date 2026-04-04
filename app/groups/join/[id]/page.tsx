"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function JoinGroup({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const joinGrp = async () => {
      try {
        const res = await fetch(`/api/groups/${id}/join`, {
          method: "POST"
        });
        
        if (res.ok) {
           router.push(`/groups/${id}`);
        } else {
           const data = await res.json();
           setError(data.error || "Failed to join");
        }
      } catch (e) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    
    joinGrp();
  }, [id, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
       {loading ? (
          <div>
             <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
             <p className="text-slate-600 font-medium tracking-wide">Joining group...</p>
          </div>
       ) : error ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100">
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
             <p className="text-red-500 font-medium mb-6">{error}</p>
             <button onClick={() => router.push("/dashboard")} className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold">Return Home</button>
          </div>
       ) : null}
    </div>
  );
}
