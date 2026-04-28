"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../../../public/icon.png";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react"; // Added for the loading state

import {
  LayoutDashboard,
  Paintbrush,
  UserPlus,
  Star,
  PlusCircle,
  Menu,
  X,
  LogOut,
  Book,
} from "lucide-react";

// --- Sub-Component: Navigation Item ---
const NavItem = ({ href, icon: Icon, label, isOpen, onClick, disabled }) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  const baseStyles = `flex items-center p-3 mb-2 rounded-xl transition-all cursor-pointer w-full text-left`;
  const activeStyles = isActive
    ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    : label === "Log-out" 
      ? "text-red-400 hover:bg-red-950/30 hover:text-red-500" 
      : "text-zinc-400 hover:bg-zinc-900 hover:text-white";

  const content = (
    <>
      <Icon size={22} className="shrink-0" />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ml-4 whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  if (!href && onClick) {
    return (
      <motion.button
        whileHover={disabled ? {} : { x: 5 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${activeStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        type="button"
      >
        {content}
      </motion.button>
    );
  }

  return (
    <Link href={disabled ? "#" : (href || "#")} onClick={disabled ? (e) => e.preventDefault() : onClick} className="block w-full">
      <motion.div
        whileHover={disabled ? {} : { x: 5 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        className={`${baseStyles} ${activeStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {content}
      </motion.div>
    </Link>
  );
};

export default function AdminLayoutShell({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New State

  async function logout() {
    setIsLoggingOut(true); // Trigger loading screen
    try {
      await authClient.signOut();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false); // Reset if it fails
    }
  }

  const navigation = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Add Tattoos", href: "/admin/tattoos", icon: PlusCircle },
    { label: "Add Artists", href: "/admin/artists", icon: Paintbrush },
    { label: "Add Member", href: "/admin/members", icon: UserPlus },
    { label: "Approve Reviews", href: "/admin/reviews", icon: Star },
    { label: "Add Blogs", href: "/admin/blogs", icon: Book },
    { label: "Log-out", onClick: logout, icon: LogOut },
  ];

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* LOGOUT OVERLAY */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-t-2 border-r-2 border-white rounded-full"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <LogOut size={24} className="text-white" />
                 </div>
              </div>
              <div className="text-center">
                <h2 className="text-white font-black uppercase italic tracking-widest text-lg">Terminating Session</h2>
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Securely logging out of Gopis Tattoo House</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Desktop Sidebar */}
      <motion.aside
        animate={{ width: isOpen ? 280 : 85 }}
        className="hidden md:flex flex-col bg-black border-r border-zinc-800 p-4 sticky top-0 h-screen transition-all z-50"
      >
        <div className="flex items-center mb-10 px-2 h-10">
          <div className="min-w-[32px] h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <Image src={Logo} width={24} height={24} alt="Logo" className="object-contain" />
          </div>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 font-bold tracking-tighter text-lg overflow-hidden whitespace-nowrap"
            >
              Gopis Tattoo House
            </motion.span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar">
          {navigation.map((item, index) => (
            <NavItem key={index} {...item} isOpen={isOpen} disabled={isLoggingOut} />
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoggingOut}
          className="mt-auto p-3 text-zinc-500 hover:text-white transition-colors flex items-center border-t border-zinc-900 pt-5"
        >
          <Menu size={20} />
          {isOpen && <span className="ml-4 text-sm font-medium">Collapse Menu</span>}
        </button>
      </motion.aside>

      {/* 2. Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-zinc-800 p-4 z-[60] flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden p-1">
             <Image src={Logo} width={20} height={20} alt="G" />
          </div>
          <span className="font-bold tracking-tighter uppercase text-xs">Gopis Tattoo House</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          disabled={isLoggingOut}
          className="p-2 bg-zinc-900 rounded-lg text-zinc-400"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 3. Mobile Drawer Overlay & Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[65] md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-black z-[70] p-6 shadow-2xl border-r border-zinc-800 flex flex-col md:hidden"
            >
              <div className="mb-10 text-xl font-bold tracking-tighter italic uppercase text-white">Navigation</div>
              <div className="flex-1">
                {navigation.map((item, index) => (
                  <NavItem
                    key={index}
                    {...item}
                    isOpen={true}
                    disabled={isLoggingOut}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      closeMobile();
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Main Dynamic Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${isLoggingOut ? 'blur-sm grayscale opacity-50' : ''}`}>
        <div className="p-6 md:p-10 pt-28 md:pt-10 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}