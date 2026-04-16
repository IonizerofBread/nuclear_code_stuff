import React from "react";
import { motion } from "framer-motion";
import { Activity, Gauge, Thermometer, Radio } from "lucide-react";

const stats = [
  { icon: Activity, label: "Reactor Core Temp", value: "327°C", status: "Nominal" },
  { icon: Gauge, label: "Turbine Output", value: "1,180 MW", status: "Optimal" },
  { icon: Thermometer, label: "Coolant Flow Rate", value: "18,500 m³/h", status: "Nominal" },
  { icon: Radio, label: "Radiation Level", value: "0.12 mSv", status: "Safe" },
];

export default function Operations() {
  return (
    <section id="operations" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest">LIVE FACILITY DATA</span>
          <h2 className="text-4xl md:text-5xl font-black text-secondary-foreground mt-3 tracking-tight">
            Operational Overview
          </h2>
          <p className="mt-4 text-secondary-foreground/60 max-w-xl mx-auto">
            Real-time monitoring ensures optimal performance and safety across all facility systems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-secondary-foreground/5 rounded-xl p-6 border border-secondary-foreground/10"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-5 h-5 text-primary" />
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400">{stat.status}</span>
                </div>
              </div>
              <p className="text-3xl font-black text-secondary-foreground">{stat.value}</p>
              <p className="text-xs font-mono text-secondary-foreground/50 mt-1 tracking-wider">{stat.label.toUpperCase()}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-secondary-foreground/5 rounded-xl border border-secondary-foreground/10 p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-secondary-foreground">Facility Status Report</h3>
              <p className="text-sm text-secondary-foreground/50 mt-1">All systems operating within normal parameters. Next scheduled maintenance: April 28, 2026.</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-sm text-green-400 font-semibold">ALL CLEAR — CONDITION GREEN</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
