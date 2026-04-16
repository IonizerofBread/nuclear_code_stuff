import React from "react";
import { Atom } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-secondary-foreground/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Atom className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-secondary-foreground tracking-tight">CEDALLION</span>
                <span className="text-[10px] font-mono text-primary block -mt-1 tracking-widest">ENERGY CORP</span>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/50 max-w-sm leading-relaxed">
              Leading the way in safe, sustainable nuclear energy production.
              Committed to powering communities while protecting our planet.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary tracking-widest mb-4">QUICK LINKS</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#operations" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">Operations</a></li>
              <li><a href="#safety" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">Safety</a></li>
              <li><Link to="/verify" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">Employee Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary tracking-widest mb-4">CONTACT</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-secondary-foreground/60">Site Alpha, Sector 7</li>
              <li className="text-sm text-secondary-foreground/60">Classified Location</li>
              <li className="text-sm text-secondary-foreground/60">ops@cedallion.energy</li>
              <li className="text-sm text-secondary-foreground/60">+1 (800) CED-NUKE</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/40 font-mono">
            © 2026 CEDALLION ENERGY CORPORATION. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-secondary-foreground/40 font-mono">
            CLASSIFICATION: UNCLASSIFIED // FOR PUBLIC RELEASE
          </p>
        </div>
      </div>
    </footer>
  );
}
