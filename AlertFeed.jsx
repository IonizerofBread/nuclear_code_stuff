import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertTriangle, Radiation, Gauge, Shield, Zap, Siren, CheckCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAlerts } from "@/context/AlertContext";
import { formatDistanceToNow } from "date-fns";

const ALERT_ICONS = {
  pressure_drop: Gauge,
  radiation_spike: Zap,
  coolant_fault: Zap,
  security_breach: Shield,
  power_fluctuation: Zap,
  emergency_alarm: Siren,
  alarm_cleared: CheckCheck,
};

const SEVERITY_STYLE = {
  Critical: { dot: "bg-red-500", text: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
  Warning: { dot: "bg-yellow-500", text: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
  Info: { dot: "bg-blue-400", text: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
};

function AlertItem({ alert }) {
  const Icon = ALERT_ICONS[alert.type] || Info;
  const style = SEVERITY_STYLE[alert.severity] || SEVERITY_STYLE.Info;
  const timeAgo = alert.created_date
    ? formatDistanceToNow(new Date(alert.created_date), { addSuffix: true })
    : "just now";

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-3 rounded-lg border ${style.bg} mb-2`}
    >
      <div className="flex items-start gap-2.5">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${style.text}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Badge variant="outline" className={`text-[9px] font-mono px-1.5 py-0 ${style.text} border-current/30`}>
              {alert.severity?.toUpperCase()}
            </Badge>
            {alert.zone && <span className="text-[10px] font-mono text-muted-foreground truncate">{alert.zone}</span>}
          </div>
          <p className="text-xs text-foreground leading-snug">{alert.message}</p>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">{timeAgo}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AlertFeed() {
  const { alerts, unreadCount, markAllRead } = useAlerts();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOpen = () => {
    setOpen(o => !o);
    if (!open) markAllRead();
  };

  const criticalCount = alerts.filter(a => a.severity === "Critical" && !a.acknowledged).length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-lg text-secondary-foreground/60 hover:text-secondary-foreground hover:bg-secondary-foreground/5 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1 ${
              criticalCount > 0 ? "bg-red-500 text-white animate-pulse" : "bg-primary text-primary-foreground"
            }`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">System Alerts</span>
                {criticalCount > 0 && (
                  <Badge className="bg-red-500 text-white text-[10px] font-mono px-1.5 animate-pulse">
                    {criticalCount} CRITICAL
                  </Badge>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feed */}
            <div className="p-3 max-h-96 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No system alerts</p>
                  <p className="text-xs mt-1">All systems nominal</p>
                </div>
              ) : (
                alerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
              )}
            </div>

            <div className="px-4 py-2 border-t border-border bg-muted/30">
              <p className="text-[10px] font-mono text-muted-foreground text-center">
                LIVE FEED — UPDATES IN REAL TIME
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
