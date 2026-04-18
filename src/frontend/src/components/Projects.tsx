import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  {
    image: "/assets/generated/project-residential.dim_600x400.jpg",
    name: "Oakwood Residences",
    description:
      "48-unit luxury residential complex featuring modern amenities and sustainable design.",
    location: "San Francisco, CA",
    category: "Residential",
  },
  {
    image: "/assets/generated/project-commercial.dim_600x400.jpg",
    name: "Apex Tower",
    description:
      "32-story Class A office tower with state-of-the-art infrastructure and LEED Gold certification.",
    location: "Chicago, IL",
    category: "Commercial",
  },
  {
    image: "/assets/generated/project-retail.dim_600x400.jpg",
    name: "Riverside Plaza",
    description:
      "280,000 sq ft mixed-use retail and entertainment destination with waterfront access.",
    location: "Austin, TX",
    category: "Retail",
  },
  {
    image: "/assets/generated/project-industrial.dim_600x400.jpg",
    name: "Meridian Logistics Hub",
    description:
      "600,000 sq ft distribution facility designed for 21st-century supply chain efficiency.",
    location: "Dallas, TX",
    category: "Industrial",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-brand-slate">
      <div className="container-max">
        {/* Heading — slides in from left */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
            Featured Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Portfolio
          </h2>
          <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Project Grid — staggered entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10 group hover:border-brand-teal transition-colors"
              data-ocid={`projects.item.${i + 1}`}
            >
              <div className="relative overflow-hidden h-44">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-brand-teal text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-base mb-2">
                  {project.name}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex items-center gap-1.5 text-white/40 text-xs">
                  <MapPin size={12} />
                  {project.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              to="/portfolio"
              className="inline-block border border-brand-teal text-brand-teal text-sm font-semibold uppercase tracking-wide px-8 py-3 rounded-full hover:bg-brand-teal hover:text-white transition-colors"
              data-ocid="projects.primary_button"
            >
              View All Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
