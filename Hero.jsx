import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-secondary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary tracking-wider">FACILITY STATUS: OPERATIONAL</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-secondary-foreground leading-[0.9] tracking-tight">
              POWERING
              <br />
              <span className="text-primary">TOMORROW'S</span>
              <br />
              FUTURE
            </h1>

            <p className="mt-6 text-lg text-secondary-foreground/60 max-w-lg leading-relaxed">
              Cedallion Energy Corporation operates at the frontier of advanced nuclear technology.
              Delivering safe, clean, and reliable energy for generations to come.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/verify">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 gap-2">
                  Employee Login
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#about">
                <Button size="lg" variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/5 px-8">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-secondary-foreground/10">
              <div>
                <p className="text-3xl font-black text-primary">4.2GW</p>
                <p className="text-xs text-secondary-foreground/50 font-mono mt-1">TOTAL OUTPUT</p>
              </div>
              <div>
                <p className="text-3xl font-black text-secondary-foreground">99.97%</p>
                <p className="text-xs text-secondary-foreground/50 font-mono mt-1">UPTIME RATE</p>
              </div>
              <div>
                <p className="text-3xl font-black text-secondary-foreground">2,400+</p>
                <p className="text-xs text-secondary-foreground/50 font-mono mt-1">EMPLOYEES</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary-foreground/5 to-primary/10 border border-secondary-foreground/10 p-12 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Central core */}
                  <div className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Orbital rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-primary/15 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/60" />
                  </div>
                  <div className="absolute w-80 h-80 rounded-full border border-secondary-foreground/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
                  </div>

                  {/* Info cards */}
                  <div className="absolute top-8 right-8 bg-secondary/90 backdrop-blur-sm rounded-lg p-3 border border-secondary-foreground/10">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs font-mono text-secondary-foreground/70">IAEA CERTIFIED</span>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-secondary/90 backdrop-blur-sm rounded-lg p-3 border border-secondary-foreground/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs font-mono text-secondary-foreground/70">ALL SYSTEMS NOMINAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
