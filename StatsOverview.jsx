import React from "react";
import { Users, ShieldCheck, Activity, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsOverview({ employees }) {
  const activeCount = employees.filter(e => e.status === "Active").length;
  const departments = [...new Set(employees.map(e => e.department))].length;
  const highClearance = employees.filter(e =>
    e.clearance_level?.includes("Level 4") || e.clearance_level?.includes("Level 5")
  ).length;

  const stats = [
    { icon: Users, label: "Total Employees", value: employees.length, color: "text-primary" },
    { icon: Activity, label: "Active Personnel", value: activeCount, color: "text-green-500" },
    { icon: ShieldCheck, label: "High Clearance", value: highClearance, color: "text-primary" },
    { icon: Clock, label: "Departments", value: departments, color: "text-blue-400" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card rounded-xl p-5 border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider">{stat.label.toUpperCase()}</span>
          </div>
          <p className="text-3xl font-black text-foreground">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
