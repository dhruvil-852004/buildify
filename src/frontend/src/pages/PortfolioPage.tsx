import { Link } from "@tanstack/react-router";
import { ArrowRight, ImageIcon, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = [
  "All Projects",
  "Site Regrading",
  "Drainage Solutions",
  "Foundation Work",
  "Commercial",
  "Residential",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Project {
  id: number;
  name: string;
  category: Exclude<Category, "All Projects">;
  location: string;
  description: string;
  image: string;
  featured?: boolean;
  acres?: string;
  timeline?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Navi Mumbai Industrial Zone Regrading",
    category: "Site Regrading",
    location: "Navi Mumbai, Maharashtra",
    description:
      "Large-scale industrial plot regrading across 12 acres, correcting uneven terrain for a logistics park, including precise slope management and soil compaction.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
    featured: true,
    acres: "12 Acres",
    timeline: "18 Months",
  },
  {
    id: 2,
    name: "Pune Residential Colony",
    category: "Residential",
    location: "Pune, Maharashtra",
    description:
      "Complete site preparation and grading for a 200-unit residential township, with precise drainage channels and compacted foundation beds.",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=700&q=80",
    acres: "5.5 Acres",
    timeline: "9 Months",
  },
  {
    id: 3,
    name: "Ahmedabad IT Park Foundation",
    category: "Foundation Work",
    location: "Ahmedabad, Gujarat",
    description:
      "Deep foundation excavation and soil stabilisation for a 6-storey IT campus, including piling and sub-grade reinforcement.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    acres: "3.2 Acres",
    timeline: "7 Months",
  },
  {
    id: 4,
    name: "Thane Stormwater Drainage Network",
    category: "Drainage Solutions",
    location: "Thane, Maharashtra",
    description:
      "Design and installation of a 4.8 km stormwater drainage grid for a new urban sector, preventing flooding and managing runoff.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    acres: "8 Acres",
    timeline: "12 Months",
  },
  {
    id: 5,
    name: "Surat Commercial Hub",
    category: "Commercial",
    location: "Surat, Gujarat",
    description:
      "Site clearing, grading, and sub-base preparation for a 10-building commercial plaza including access roads and parking lots.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
    acres: "7 Acres",
    timeline: "14 Months",
  },
  {
    id: 6,
    name: "Nashik Hillside Slope Correction",
    category: "Site Regrading",
    location: "Nashik, Maharashtra",
    description:
      "Challenging hillside regrading project requiring cut-and-fill techniques and retaining wall support for a housing development.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80",
    acres: "4.1 Acres",
    timeline: "10 Months",
  },
  {
    id: 7,
    name: "Mumbai Suburban Road Foundation",
    category: "Foundation Work",
    location: "Mumbai, Maharashtra",
    description:
      "Sub-grade preparation and compaction for a 3.2 km arterial road extension in suburban Mumbai including culvert placements.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80",
    acres: "6 Acres",
    timeline: "8 Months",
  },
  {
    id: 8,
    name: "Vadodara Industrial Drainage",
    category: "Drainage Solutions",
    location: "Vadodara, Gujarat",
    description:
      "Industrial effluent drainage network for a 15-acre chemical processing facility with slope-graded channels and retention ponds.",
    image:
      "https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=700&q=80",
    acres: "15 Acres",
    timeline: "11 Months",
  },
  {
    id: 9,
    name: "Lonavala Hill Resort Grading",
    category: "Site Regrading",
    location: "Lonavala, Maharashtra",
    description:
      "Precision regrading for a luxury hillside resort with multi-level terracing, natural landscape integration, and erosion control.",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=700&q=80",
    acres: "9 Acres",
    timeline: "15 Months",
  },
  {
    id: 10,
    name: "Gandhinagar Smart City Plot",
    category: "Commercial",
    location: "Gandhinagar, Gujarat",
    description:
      "Turnkey site development for a smart city commercial zone including grading, drainage, utilities trench, and road base.",
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=700&q=80",
    acres: "11 Acres",
    timeline: "16 Months",
  },
  {
    id: 11,
    name: "Kolhapur Residential Township",
    category: "Residential",
    location: "Kolhapur, Maharashtra",
    description:
      "Complete site preparation for a 350-unit affordable housing township with eco-drainage and rainwater harvesting integration.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80",
    acres: "6.8 Acres",
    timeline: "13 Months",
  },
  {
    id: 12,
    name: "Rajkot Warehouse Complex",
    category: "Foundation Work",
    location: "Rajkot, Gujarat",
    description:
      "Deep piling and sub-grade reinforcement for a 200,000 sq ft warehouse and distribution facility near the industrial ring road.",
    image:
      "https://images.unsplash.com/photo-1594955571-c06798d5af8a?w=700&q=80",
    acres: "10 Acres",
    timeline: "9 Months",
  },
];

const STATS = [
  { value: "25+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "5+", label: "States Covered" },
  { value: "98%", label: "Client Satisfaction" },
];

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden shadow-xl border-l-4 border-earth-brown group mb-8"
      data-ocid="portfolio.featured_card"
    >
      <div className="relative h-72 md:h-96">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/90 via-brand-slate/30 to-transparent" />
        {/* Featured badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-brand-teal text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            {project.category}
          </span>
          <span className="bg-earth-yellow text-earth-charcoal text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            Featured
          </span>
        </div>
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 font-display">
            {project.name}
          </h3>
          <div className="flex items-center gap-1.5 text-white/70 text-sm mb-3">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-earth-yellow font-semibold">
              {project.acres}
            </span>
            <span className="text-white/60">{project.timeline}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-card rounded-xl overflow-hidden shadow-md group border border-border hover:border-l-4 hover:border-l-earth-brown transition-all duration-300 cursor-pointer"
      data-ocid={`portfolio.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-teal text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow">
            {project.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-slate/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to="/contact" data-ocid={`portfolio.view_button.${index + 1}`}>
            <button
              type="button"
              className="flex items-center gap-2 bg-brand-teal text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-opacity min-h-[44px]"
            >
              View Details <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-foreground font-bold text-base mb-1.5 font-display leading-tight">
          {project.name}
        </h3>
        <div className="flex items-center gap-1 text-brand-muted text-xs mb-2.5">
          <MapPin size={12} />
          <span>{project.location}</span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>
        {project.acres && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
            <span className="text-xs text-brand-muted font-medium">
              {project.acres}
            </span>
            <span className="text-xs text-brand-muted">{project.timeline}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All Projects");

  const featured = PROJECTS.find((p) => p.featured)!;
  const gridProjects =
    activeFilter === "All Projects"
      ? PROJECTS.filter((p) => !p.featured)
      : PROJECTS.filter((p) => p.category === activeFilter && !p.featured);

  // If filtering to a category that has the featured project, show it normally in grid
  const filteredFeaturedInGrid =
    activeFilter !== "All Projects" && featured.category === activeFilter
      ? [featured, ...gridProjects]
      : gridProjects;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-14 sm:pt-16 md:pt-20"
      data-ocid="portfolio.page"
    >
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center"
        data-ocid="portfolio.hero_section"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80')",
          }}
        />
        {/* Dark slate overlay */}
        <div className="absolute inset-0 bg-brand-slate opacity-85" />

        {/* Teal grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.536 0.098 196.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.536 0.098 196.3) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {/* Geometric accent — radial circle bottom-right */}
        <div
          className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.536 0.098 196.3) 0%, transparent 70%)",
          }}
        />
        {/* Geometric accent — rotated square top-right */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rotate-45 opacity-[0.06]"
          style={{ background: "oklch(0.661 0.196 38.6)" }}
        />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 md:py-24 w-full">
          <div className="max-w-3xl text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-5 flex items-center gap-2"
            >
              <ImageIcon size={14} />
              Our Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black text-white leading-tight mb-6"
            >
              Our Completed <span className="text-brand-teal">Portfolio</span>{" "}
              of Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              Explore our completed projects across Maharashtra and Gujarat —
              precision regrading, drainage, and foundation work that transforms
              raw land into ready-to-build sites.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px] w-full sm:w-auto"
                data-ocid="portfolio.hero_cta_button"
              >
                Start Your Project <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors min-h-[44px] w-full sm:w-auto"
                data-ocid="portfolio.hero_services_button"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex items-center gap-2 mt-10 sm:mt-14 text-white/50 text-sm"
          >
            <Link
              to="/"
              className="hover:text-brand-teal transition-colors"
              data-ocid="portfolio.home_link"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-teal">Portfolio</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-teal" data-ocid="portfolio.stats_section">
        <div className="container-max px-4 sm:px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
                data-ocid={`portfolio.stat.${i + 1}`}
              >
                <div className="text-white text-3xl md:text-4xl font-bold font-display mb-1">
                  {stat.value}
                </div>
                <div className="text-white/75 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="portfolio.projects_section"
      >
        <div className="container-max">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text mb-3"
            >
              Our Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-brand-muted text-base max-w-xl mx-auto"
            >
              Browse our portfolio of precision site work across Maharashtra and
              Gujarat.
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <div
            className="overflow-x-auto pb-1 mb-10 -mx-1 px-1"
            data-ocid="portfolio.filter_tabs"
          >
            <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`portfolio-filter-btn min-h-[44px] px-4 md:px-5 py-2 text-sm font-semibold rounded-full border transition-all whitespace-nowrap ${
                    activeFilter === cat
                      ? "bg-brand-teal text-white border-brand-teal shadow"
                      : "bg-card text-brand-muted border-border hover:border-brand-teal hover:text-brand-teal"
                  }`}
                  data-ocid={`portfolio.filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Project — only shown on "All Projects" */}
          {activeFilter === "All Projects" && (
            <FeaturedProjectCard project={featured} />
          )}

          {/* Project Grid */}
          {filteredFeaturedInGrid.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFeaturedInGrid.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20 text-brand-muted"
              data-ocid="portfolio.empty_state"
            >
              <p className="text-lg font-medium">
                No projects found in this category yet.
              </p>
              <p className="text-sm mt-2">
                Check back soon or{" "}
                <button
                  type="button"
                  onClick={() => setActiveFilter("All Projects")}
                  className="text-brand-teal underline"
                >
                  view all projects
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-brand-slate section-padding"
        data-ocid="portfolio.cta_section"
      >
        <div className="container-max px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Ready to Build?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Start Your Project Today
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Partner with Buildify for precision site preparation, regrading,
              and foundation work. Get a free site assessment and quote.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-teal text-white text-sm font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg min-h-[44px]"
              data-ocid="portfolio.cta_button"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
