"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/public/SplashScreen";
import Navbar from "@/components/public/Navbar";
import WhatsAppFAB from "@/components/public/WhatsAppFAB";

export default function PublicLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // This ensures the splash runs on every browser refresh
  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <div className="mb-25">
        <Navbar></Navbar>
      </div>
      <main className={isLoading ? "hidden" : "block"}>{children}</main>
      <WhatsAppFAB></WhatsAppFAB>
    </div>
  );
}
