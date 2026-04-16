import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Atom, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Atom className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-secondary-foreground tracking-tight">CEDALLION</span>
            <span className="text-[10px] font-mono text-primary block -mt-1 tracking-widest">ENERGY CORP</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">About</a>
          <a href="#operations" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Operations</a>
          <a href="#safety" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">Safety</a>
          <Link to="/verify">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Employee Portal
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-secondary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary border-t border-border/30"
          >
            <div className="px-6 py-4 space-y-3">
              <a href="#about" className="block text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>About</a>
              <a href="#operations" className="block text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>Operations</a>
              <a href="#safety" className="block text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>Safety</a>
              <Link to="/verify" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full bg-primary text-primary-foreground font-semibold mt-2">
                  Employee Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
