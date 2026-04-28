"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import logo from "../../../../../public/icon.png";
import Image from "next/image";
import { motion } from "framer-motion"; // Added for smooth animations

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (res?.error) {
        throw new Error(res.error.message);
      }

      router.push("/admin/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-900 rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10"
      >
        <div className="flex justify-center items-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-[100px] w-[100px] rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/20 flex justify-center items-center shadow-inner"
          >
            <Image
              height={60}
              width={80}
              src={logo}
              alt="Gopis Tattoo House Logo"
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="space-y-2 mb-10">
          <h2 className="text-center text-zinc-400 font-medium tracking-[0.2em] uppercase text-xs">
            Gopis Tattoo House
          </h2>
          <h1 className="text-3xl font-bold text-center text-white tracking-tight">
            Admin Access
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div className="group relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                required
              />
            </div>

            <div className="group relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                required
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : "Enter Studio"}
          </motion.button>
        </form>

        <p className="text-center text-zinc-600 text-sm mt-8">
          &copy; {new Date().getFullYear()} Gopis Tattoo House. Authorized Personnel Only.
        </p>
      </motion.div>
    </div>
  );
}