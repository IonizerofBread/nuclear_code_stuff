import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Siren, ShieldOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAlerts } from "@/context/AlertContext";

export default function AlarmButton() {
  const { alarmActive, triggerAlarm, clearAlarm, user } = useAlerts();
  const [confirming, setConfirming] = useState(false);

  if (user?.role !== "admin") return null;

  const handleTrigger = async () => {
    if (!confirming) { setConfirming(true); return; }
    setConfirming(false);
    await triggerAlarm();
  };

  const handleClear = async () => {
    setConfirming(false);
    await clearAlarm();
  };

  return (
    <div className="relative flex items-center gap-2">
      <AnimatePresence>
        {confirming && !alarmActive && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-1.5"
          >
            <span className="text-xs font-mono text-red-400 whitespace-nowrap">CONFIRM?</span>
            <button onClick={() => setConfirming(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {alarmActive ? (
        <motion.button
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold font-mono hover:bg-red-600 transition-colors"
        >
          <ShieldOff className="w-3.5 h-3.5" />
          CLEAR ALARM
        </motion.button>
      ) : (
        <button
          onClick={handleTrigger}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
            confirming
              ? "bg-red-600 text-white animate-pulse"
              : "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20"
          }`}
        >
          <Siren className="w-3.5 h-3.5" />
          {confirming ? "SOUND ALARM" : "ALARM"}
        </button>
      )}
    </div>
  );
}
