import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />

      <div className="container-max px-4 md:px-6 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-left"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Premier Construction & Development
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-6"
          >
            Building the Future,{" "}
            <span style={{ color: "oklch(0.536 0.098 196.3)" }}>
              One Project
            </span>{" "}
            at a Time.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-base md:text-lg mb-10 leading-relaxed"
          >
            Premier Construction & Project Management for Residential &amp;
            Commercial Developments. Delivering excellence, on time and within
            budget.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="bg-brand-teal text-white font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
              data-ocid="hero.primary_button"
            >
              View Our Projects
            </a>
            <a
              href="#contact"
              className="bg-brand-tan text-white font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
              data-ocid="hero.secondary_button"
            >
              Request A Consultation
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: "oklch(0.318 0.042 213.5 / 0.92)" }}
      >
        <div className="container-max px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "250+", label: "Projects Completed" },
              { value: "18+", label: "Years of Experience" },
              { value: "120+", label: "Team Members" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-5 px-4">
                <div className="text-2xl md:text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
