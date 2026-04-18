import { Link } from "@tanstack/react-router";
import { Award, Building2, ThumbsUp, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Building2, value: "500+", label: "Projects Completed" },
  { icon: Award, value: "20 Yrs", label: "Of Experience" },
  { icon: Users, value: "50+", label: "Team Members" },
  { icon: ThumbsUp, value: "100%", label: "Client Satisfaction" },
];

export default function AboutSnippet() {
  return (
    <section
      id="about-snippet"
      className="section-padding"
      style={{ background: "oklch(0.975 0.004 62)" }}
    >
      <div className="container-max">
        {/* Section heading entrance from left */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-1">
            WHO WE ARE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text leading-tight">
            Building Excellence{" "}
            <span className="text-brand-teal">Since 2005</span>
          </h2>
          <div className="w-12 h-1 bg-brand-teal rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-brand-muted text-base leading-relaxed mb-3">
              Buildify is a trusted construction company with two decades of
              experience delivering high-quality residential and commercial
              projects across India.
            </p>
            <p className="text-brand-muted text-base leading-relaxed mb-3">
              From concept to completion, our skilled team is committed to
              craftsmanship, transparency, and on-time delivery — earning the
              confidence of clients in Mumbai, Pune, Ahmedabad, and Surat.
            </p>
            <p className="text-brand-muted text-base leading-relaxed mb-8">
              We believe great buildings start with great relationships. Every
              project we take on is a long-term partnership built on trust,
              precision, and passion.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              <Link
                to="/about"
                data-ocid="about_snippet.learn_more_button"
                className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold uppercase tracking-wide text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity duration-200 shadow-md"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="grid grid-cols-2 gap-5"
            data-ocid="about_snippet.stats"
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center group"
                data-ocid={`about_snippet.stat.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-3 group-hover:bg-brand-teal/20 transition-colors duration-200">
                  <Icon className="w-6 h-6 text-brand-teal" />
                </div>
                <span className="text-2xl font-bold text-brand-text mb-1">
                  {value}
                </span>
                <span className="text-brand-muted text-xs uppercase tracking-wider font-medium">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
