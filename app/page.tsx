"use client";

import { CreditCard, PieChart, Users, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Paysure</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg active:scale-95">
            Log In
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white"></div>
        <div className="max-w-5xl mx-auto text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900">
            Split Expenses. <br className="hidden md:block"/> Track Spending. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Stay Smart.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Manage your personal finances, split bills with friends seamlessly, and gain powerful insights into your spending habits—all in one secure place.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-xl hover:shadow-2xl active:scale-95">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-sm hover:shadow-md active:scale-95">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* STATS / VISUAL */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600">₹1M+</h2>
            <p className="text-slate-500 font-medium mt-1">Expenses Managed</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-indigo-600">10k+</h2>
            <p className="text-slate-500 font-medium mt-1">Active Users</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600">99.9%</h2>
            <p className="text-slate-500 font-medium mt-1">Accurate Splits</p>
          </div>
          <div>
             <h2 className="text-4xl font-extrabold text-indigo-600">4.9/5</h2>
            <p className="text-slate-500 font-medium mt-1">User Rating</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Paysure?</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Everything you need to manage money with friends and family without the awkward math.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="h-14 w-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PieChart className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Tracking</h3>
            <p className="text-slate-600 leading-relaxed">
              Track all your spending visually and categorize automatically so you know exactly where your money goes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="h-14 w-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Split Seamlessly</h3>
            <p className="text-slate-600 leading-relaxed">
              Create groups, add expenses, and let the app calculate who owes what. Say goodbye to awkward IOUs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
             <div className="h-14 w-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Bank-grade Security</h3>
            <p className="text-slate-600 leading-relaxed">
              Your financial data is encrypted and stored securely. We use industry-standard security protocols.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Take Control of Your Money
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of users who are already saving time and avoiding awkward money conversations.
          </p>
          <button className="relative z-10 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95">
            Start for Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Zap className="h-5 w-5 text-slate-400" />
             <span className="font-bold text-slate-400">Paysure</span>
          </div>
          <p className="text-slate-500 font-medium">© {new Date().getFullYear()} Paysure. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-slate-900">Terms</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}