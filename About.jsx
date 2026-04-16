import React from "react";
import { motion } from "framer-motion";
import { Shield, Atom, Users, FlaskConical } from "lucide-react";

const features = [
  {
    icon: Atom,
    title: "Advanced Reactor Design",
    description: "Next-generation reactor technology delivering unprecedented efficiency and safety margins across all operational parameters."
  },
  {
    icon: Shield,
    title: "Uncompromised Safety",
    description: "Multi-layered safety protocols with automated shutdown systems, continuous monitoring, and triple-redundant failsafes."
  },
  {
    icon: Users,
    title: "Expert Personnel",
    description: "World-class engineers, physicists, and safety specialists maintaining the highest standards of operational excellence."
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description: "Pioneering breakthroughs in nuclear technology, fuel efficiency, and sustainable waste management processes."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest">ABOUT CEDALLION ENERGY</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mt-3 tracking-tight">
            Excellence in Nuclear Energy
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            For over three decades, Cedallion Energy Corporation has been at the forefront
            of nuclear energy innovation, powering communities while maintaining
            unwavering commitment to safety and sustainability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
