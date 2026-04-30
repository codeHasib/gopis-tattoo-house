"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/public/SplashScreen";

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

      <main className={isLoading ? "hidden" : "block"}>{children}</main>
    </div>
  );
}
