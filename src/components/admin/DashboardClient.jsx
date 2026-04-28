"use client";

import { motion } from "framer-motion";
import {
  Paintbrush,
  Users,
  Star,
  PlusCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// --- Stat Card Component ---
const StatCard = ({ label, value, icon: Icon, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="relative group overflow-hidden bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm hover:border-zinc-700 transition-all"
  >
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
          {label}
        </p>
        <h3 className="text-4xl font-bold text-white tracking-tight">
          {value}
        </h3>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-semibold">
            <TrendingUp size={14} />
            <span>{trend} this month</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-zinc-800/80 rounded-2xl text-white group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
    </div>
    {/* Subtle Background Glow */}
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
  </motion.div>
);

export default function DashboardClient() {
  const [tattoos, setTattoos] = useState([]);
  const [artists, setArtists] = useState([]);
  const [members, setMembers] = useState([]);
  const [reviews, setReviews] = useState([]);

  async function loadTattoos() {
    const res = await fetch("/api/tattoo");
    const data = await res.json();

    if (data.success) {
      setTattoos(data.data); // 👈 IMPORTANT: your action returns "data"
    }
  }

  async function loadArtists() {
    const res = await fetch("/api/artist");
    const data = await res.json();

    if (data.success) {
      setArtists(data.data); // 👈 IMPORTANT: your action returns "data"
    }
  }
  async function loadMembers() {
    const res = await fetch("/api/member");
    const data = await res.json();

    if (data.success) {
      setMembers(data.data); // 👈 IMPORTANT: your action returns "data"
    }
  }

  // Pending reviews

  async function load() {
    const res = await fetch("/api/review/admin");
    const data = await res.json();
    setReviews(data.data);
  }

  async function approve(id) {
    await fetch(`/api/review/${id}`, {
      method: "PUT",
    });
    load();
  }

  async function remove(id) {
    await fetch(`/api/review/${id}`, {
      method: "DELETE",
    });
    load();
  }

  useEffect(() => {
    loadTattoos();
    loadArtists();
    loadMembers();
    load();
  }, []);

  const approvedReviews = useMemo(() => {
    return reviews.filter((item) => item.status !== "approved");
  }, [reviews]);

  const stats = [
    {
      label: "Total Tattoos",
      value: tattoos.length,
      icon: PlusCircle,
      trend: `${tattoos.length}+`,
      delay: 0.1,
    },
    {
      label: "Total Artists",
      value: artists.length,
      icon: Paintbrush,
      trend: `${artists.length}+`,
      delay: 0.2,
    },
    {
      label: "Total Members",
      value: members.length,
      icon: Users,
      trend: `${members.length}+`,
      delay: 0.3,
    },
    {
      label: "Total Reviews",
      value: reviews.length,
      icon: Star,
      trend: `${reviews.length}+`,
      delay: 0.4,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Studio Overview
          </h1>
          <p className="text-zinc-500 mt-1 font-medium">
            Welcome back, Admin. Here is what's happening at Gopis Tattoo House.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl px-4">
          <Calendar size={18} className="text-zinc-400" />
          <span className="text-sm font-semibold text-zinc-300">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Secondary Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reviews Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pending Reviews</h2>
            <Link href={"/admin/reviews"}>
              <button className="text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4">
                View All
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {approvedReviews.length > 0 ? (
              approvedReviews
                .slice(-8)
                .toReversed()
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between lg:flex-row lg:gap-0 md:flex-row md:gap-0 flex-col gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs">
                        {item.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-white italic">
                          {item.message}
                        </p>
                        <p className="text-xs text-white font-bold">
                          Rating:- {item.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approve(item._id)}
                        className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => remove(item._id)}
                        className="px-4 py-2 bg-red-400 text-white text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center bg-[#ffffff4e] py-5 rounded-4xl">
                No pending reviews
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions / Artist Spotlight */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/20 border border-zinc-700/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center"
        >
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
            <Paintbrush className="text-white" size={32} />
          </div>
          <h3 className="text-lg font-bold">Active Artists</h3>
          <p className="text-zinc-500 text-sm mt-2 mb-6">
            Manage your crew and update their portfolio galleries.
          </p>
          <Link href={"/admin/members"}>
            <button className="w-full py-3 bg-zinc-100 text-black font-bold rounded-xl hover:bg-white transition-all">
              Manage Crew
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
