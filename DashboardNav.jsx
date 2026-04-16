import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Atom, LogOut, Menu, X, Database, LayoutDashboard, Map, AlertTriangle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { AnimatePresence, motion } from "framer-motion";
import AlertFeed from "@/components/alerts/AlertFeed";
import AlarmButton from "@/components/alerts/AlarmButton";

export default function DashboardNav({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    base44.auth.logout("/");
  };

  return (
    <nav className="bg-secondary border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Atom className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-secondary-foreground tracking-tight">CEDALLION</span>
            <span className="text-[10px] font-mono text-primary block -mt-1 tracking-widest">EMPLOYEE PORTAL</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/dashboard/database" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
            <Database className="w-4 h-4" />
            Database
          </Link>
          <Link to="/dashboard/map" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
            <Map className="w-4 h-4" />
            Facility Map
          </Link>
          <Link to="/dashboard/incidents" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
            <AlertTriangle className="w-4 h-4" />
            Incidents
          </Link>
          <div className="h-6 w-px bg-secondary-foreground/10" />
          <AlarmButton />
          <AlertFeed />
          <div className="h-6 w-px bg-secondary-foreground/10" />
          <div className="text-right">
            <p className="text-xs font-semibold text-secondary-foreground">{user?.full_name || "Employee"}</p>
            <p className="text-[10px] font-mono text-secondary-foreground/50">{user?.role?.toUpperCase() || "USER"}</p>
          </div>
          <Button size="sm" variant="ghost" onClick={handleLogout} className="text-secondary-foreground/60 hover:text-destructive">
            <LogOut className="w-4 h-4" />
          </Button>
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
              <p className="text-xs font-mono text-secondary-foreground/50 mb-2">Signed in as {user?.full_name || "Employee"}</p>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/dashboard/database" className="flex items-center gap-2 text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>
                <Database className="w-4 h-4" /> Database
              </Link>
              <Link to="/dashboard/map" className="flex items-center gap-2 text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>
                <Map className="w-4 h-4" /> Facility Map
              </Link>
              <Link to="/dashboard/incidents" className="flex items-center gap-2 text-sm text-secondary-foreground/70" onClick={() => setMobileOpen(false)}>
                <AlertTriangle className="w-4 h-4" /> Incidents
              </Link>
              <Button size="sm" variant="ghost" onClick={handleLogout} className="text-destructive w-full justify-start mt-2">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
