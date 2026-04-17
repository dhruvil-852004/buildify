import {
  ArrowRight,
  Building2,
  ClipboardList,
  HardHat,
  Home,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: HardHat,
    title: "General Contracting",
    description:
      "Full-service general contracting with end-to-end project delivery. We manage every detail from groundbreaking to final handover.",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description:
      "Expert coordination of timelines, budgets, and subcontractors to keep your project on track and within scope.",
  },
  {
    icon: Home,
    title: "Residential Build",
    description:
      "Custom homes and residential developments built to the highest standards, combining craftsmanship with modern design.",
  },
  {
    icon: Building2,
    title: "Commercial Development",
    description:
      "Large-scale commercial construction from office towers to retail centers, built for performance and longevity.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
            Our Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
            Services
          </h2>
          <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow group"
              data-ocid={`services.card.${i + 1}`}
            >
              <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-brand-teal transition-colors">
                <svc.icon className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-brand-text text-lg mb-3">
                {svc.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-5">
                {svc.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-brand-teal text-sm font-semibold hover:gap-3 transition-all"
                data-ocid={`services.link.${i + 1}`}
              >
                Learn More <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
