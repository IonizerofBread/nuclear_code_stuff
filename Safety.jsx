import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, AlertTriangle } from "lucide-react";

const protocols = [
  {
    icon: ShieldCheck,
    title: "Defense in Depth",
    description: "Multiple independent safety barriers ensure containment integrity under all conditions."
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Biometric and multi-factor authentication systems protect all restricted facility zones."
  },
  {
    icon: Eye,
    title: "24/7 Monitoring",
    description: "Continuous environmental and radiological monitoring with automated alert systems."
  },
  {
    icon: AlertTriangle,
    title: "Emergency Response",
    description: "Comprehensive emergency protocols with regular drills and coordination with local authorities."
  }
];

export default function Safety() {
  return (
    <section id="safety" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary tracking-widest">SAFETY PROTOCOLS</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mt-3 tracking-tight">
              Safety Is Our
              <br />
              <span className="text-primary">Core Mission</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              Every system, every procedure, and every employee at Cedallion Energy
              is dedicated to maintaining the highest safety standards in the industry.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-2xl font-black text-foreground">0</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">SAFETY INCIDENTS (YTD)</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-2xl font-black text-foreground">12,400+</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">SAFE OPERATING HOURS</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {protocols.map((protocol, i) => (
              <motion.div
                key={protocol.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <protocol.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{protocol.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{protocol.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
