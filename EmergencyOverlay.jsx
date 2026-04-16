import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Siren } from "lucide-react";
import { useAlerts } from "@/context/AlertContext";

export default function EmergencyOverlay() {
  const { alarmActive } = useAlerts();

  // Prevent scrolling while alarm is active
  useEffect(() => {
    if (alarmActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [alarmActive]);

  return (
    <AnimatePresence>
      {alarmActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Pulsing red border overlay */}
          <motion.div
            className="absolute inset-0 border-[12px] border-red-600"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle red tint */}
          <motion.div
            className="absolute inset-0 bg-red-900"
            animate={{ opacity: [0.12, 0.06, 0.12] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Top banner */}
          <motion.div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-center gap-3">
              <Siren className="w-5 h-5 shrink-0" />
              <span className="font-mono font-bold tracking-widest text-sm">
                ⚠ EMERGENCY EVACUATION IN PROGRESS — ALL PERSONNEL EVACUATE IMMEDIATELY ⚠
              </span>
              <Siren className="w-5 h-5 shrink-0" />
            </div>
          </motion.div>

          {/* Corner warning triangles */}
          {["top-16 left-4", "top-16 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos}`}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
            >
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
