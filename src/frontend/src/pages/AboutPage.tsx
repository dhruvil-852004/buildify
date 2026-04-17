import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Linkedin,
  MapPin,
  Mountain,
  Shield,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

/* ── Data ── */

const stats = [
  { value: "500+", label: "Sites Graded" },
  { value: "20+", label: "Years Experience" },
  { value: "15+", label: "Equipment Fleet" },
  { value: "100%", label: "Site Safety Record" },
];

const services = [
  {
    icon: Mountain,
    title: "Land Grading",
    description:
      "Precision laser-guided grading to achieve exact elevation and slope specs across any terrain type.",
    img: "/assets/generated/about-regrading-survey.dim_800x600.jpg",
  },
  {
    icon: Layers,
    title: "Slope Correction",
    description:
      "Engineered slope stabilisation and erosion-control systems that meet regulatory drainage standards.",
    img: "/assets/generated/about-slope-correction.dim_600x400.jpg",
  },
  {
    icon: Zap,
    title: "Drainage Solutions",
    description:
      "Site-wide stormwater management, swales, French drains, and culvert installation.",
    img: "/assets/generated/about-drainage.dim_600x400.jpg",
  },
  {
    icon: Shield,
    title: "Soil Compaction",
    description:
      "Vibratory roller and plate-compactor service to achieve specified Proctor density for any load requirement.",
    img: "/assets/generated/about-compaction.dim_600x400.jpg",
  },
  {
    icon: Truck,
    title: "Cut & Fill Operations",
    description:
      "Mass earthwork balancing — material removed from high spots is reused to build up low areas, minimising haul cost.",
    img: "/assets/generated/about-cut-fill.dim_600x400.jpg",
  },
  {
    icon: CheckCircle2,
    title: "Foundation Site Prep",
    description:
      "Sub-base preparation, bearing-capacity testing, and final-grade certification before your slab or piling goes in.",
    img: "/assets/generated/about-foundation-prep.dim_600x400.jpg",
  },
];

const process = [
  {
    step: "01",
    title: "Site Survey",
    desc: "Topographic survey and soil-bearing assessment using GPS total-station equipment.",
  },
  {
    step: "02",
    title: "Site Clearing",
    desc: "Vegetation removal, demolition, and debris haul-off to expose the native subgrade.",
  },
  {
    step: "03",
    title: "Cut & Grade",
    desc: "Excavators and dozers execute the engineered cut-fill plan to within ±30 mm tolerance.",
  },
  {
    step: "04",
    title: "Compaction",
    desc: "Layer-by-layer compaction with in-situ density testing at every lift.",
  },
  {
    step: "05",
    title: "Final Grade Check",
    desc: "Licensed surveyor verifies finished elevations before handover to the structural team.",
  },
];

const values = [
  {
    icon: CheckCircle2,
    title: "Precision Grading",
    description:
      "Every finished surface is surveyed and certified. We hold ±30 mm tolerance as a standard, not an aspiration.",
  },
  {
    icon: Truck,
    title: "Heavy Equipment Expertise",
    description:
      "Our operators average 15 years in the seat. We own and maintain our own fleet so there are no subcontractor surprises.",
  },
  {
    icon: Shield,
    title: "Environmental Compliance",
    description:
      "Full SWPPP compliance, erosion control BMPs, and liaison with regulators — so your project doesn't get red-tagged.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Earthwork holds up every trade behind it. We treat the schedule as sacred and have an on-time record to prove it.",
  },
];

const leaders = [
  {
    image: "/assets/generated/team-ceo.dim_300x300.jpg",
    name: "Marcus Harrington",
    role: "Site Grading Director",
    bio: "25 years directing large-scale earthwork and site-development projects across Western India. Marcus founded Buildify on the principle that proper grading prevents every downstream problem.",
    linkedin: "https://linkedin.com",
  },
  {
    image: "/assets/generated/team-coo.dim_300x300.jpg",
    name: "Sophia Chen",
    role: "Equipment Fleet Manager",
    bio: "Sophia oversees Buildify's 15+ unit fleet — from maintenance schedules to operator certification. Her logistics background keeps every machine on-site on time.",
    linkedin: "https://linkedin.com",
  },
  {
    image: "/assets/generated/team-director.dim_300x300.jpg",
    name: "James Okafor",
    role: "Environmental Compliance Officer",
    bio: "A licensed civil engineer and certified SWPPP practitioner, James ensures every Buildify project satisfies state and local environmental regulations without a single NOV.",
    linkedin: "https://linkedin.com",
  },
  {
    image: "/assets/generated/team-engineer.dim_300x300.jpg",
    name: "Priya Nair",
    role: "Senior Grade Operator",
    bio: "With 18 years on the blade, Priya is Buildify's highest-certified grade operator — known for laser-controlled finish work on complex multi-phase grading contracts.",
    linkedin: "https://linkedin.com",
  },
];

const galleryImages = [
  {
    src: "/assets/generated/about-hero-regrading.dim_1600x900.jpg",
    caption: "Mass Earthwork — Commercial Logistics Park",
  },
  {
    src: "/assets/generated/about-before-after.dim_800x500.jpg",
    caption: "Before & After — Residential Development",
  },
  {
    src: "/assets/generated/about-cut-fill.dim_600x400.jpg",
    caption: "Cut & Fill — Industrial Estate Phase 2",
  },
  {
    src: "/assets/generated/about-compaction.dim_600x400.jpg",
    caption: "Soil Compaction — Warehouse Pad",
  },
  {
    src: "/assets/generated/about-drainage.dim_600x400.jpg",
    caption: "Drainage Installation — Subdivision",
  },
  {
    src: "/assets/generated/about-slope-correction.dim_600x400.jpg",
    caption: "Slope Correction — Road Embankment",
  },
];

/* ── Component ── */

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20" data-ocid="about.page">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[580px] flex items-center overflow-hidden"
        data-ocid="about.hero_section"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/about-hero-regrading.dim_1600x900.jpg"
            alt="Regrading operations at Buildify construction site"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, oklch(0.15 0.02 50 / 0.85) 0%, oklch(0.15 0.02 50 / 0.55) 60%, transparent 100%)",
            }}
          />
        </div>

        <div className="container-max px-4 md:px-6 relative z-10 py-20 md:py-28 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-left"
          >
            <span className="inline-flex items-center gap-2 bg-brand-teal/20 border border-brand-teal/40 text-brand-teal text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <MapPin size={12} />
              Mumbai · Pune · Ahmedabad · Surat
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 text-left">
              Masters of <span className="text-brand-teal">Site Regrading</span>{" "}
              &amp; Ground Preparation
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 text-left">
              For 20+ years, Buildify has shaped the ground beneath Western
              India's most ambitious developments — delivering precision-graded,
              compacted, and drainage-ready sites that every structure can be
              built on with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-left">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                data-ocid="about.hero_cta_primary"
              >
                Get a Site Assessment
                <ArrowRight size={16} />
              </Link>
              <a
                href="#regrading-services"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors"
                data-ocid="about.hero_cta_secondary"
              >
                Our Services
                <ChevronRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-brand-slate" data-ocid="about.stats_section">
        <div className="container-max px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                data-ocid={`about.stat.${i + 1}`}
              >
                <p className="text-4xl md:text-5xl font-black text-brand-teal mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is Site Regrading? ── */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="about.what_is_section"
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-3">
                The Foundation of Every Build
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-5">
                What is Site Regrading?
              </h2>
              <div className="w-10 h-1 bg-brand-teal rounded-full mb-7" />
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  <strong className="text-brand-text">Site regrading</strong> is
                  the controlled reshaping of land to a designed elevation and
                  slope — the very first (and most critical) step before any
                  foundation, road, or utility can be placed. Get it wrong and
                  water migrates toward structures, bearing capacity fails, and
                  every trade behind us pays the price.
                </p>
                <p>
                  The process involves four stages: topographic{" "}
                  <strong className="text-brand-text">survey</strong>, mass{" "}
                  <strong className="text-brand-text">cut and fill</strong>{" "}
                  earthwork to reach the design grade, layer-by-layer{" "}
                  <strong className="text-brand-text">soil compaction</strong>{" "}
                  to achieve structural density, and{" "}
                  <strong className="text-brand-text">
                    drainage correction
                  </strong>{" "}
                  to direct stormwater safely off-site.
                </p>
                <p>
                  Buildify combines GPS machine control, real-time density
                  testing, and 20 years of field experience to deliver finished
                  grades that are certified, documented, and ready for the
                  structural engineer's sign-off.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  "GPS Machine Control",
                  "Proctor Density Testing",
                  "SWPPP Compliance",
                  "Certified Surveyors",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-brand-text font-medium"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-brand-teal shrink-0"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/assets/generated/about-regrading-survey.dim_800x600.jpg"
                  alt="Surveying instrument on graded construction site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-semibold text-sm">
                    GPS-guided laser levelling in progress
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Tolerance: ±30 mm from design elevation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Regrading Services ── */}
      <section
        id="regrading-services"
        className="section-padding bg-brand-bg"
        data-ocid="about.services_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              Our Regrading Services
            </h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group"
                data-ocid={`about.service_card.${i + 1}`}
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-teal transition-colors">
                    <svc.icon
                      size={20}
                      className="text-brand-teal group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-bold text-brand-text text-lg mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="about.process_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
              How We Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              The Regrading Process
            </h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-0">
              {process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-5 group"
                  data-ocid={`about.process_step.${i + 1}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center shrink-0 group-hover:bg-brand-tan transition-colors">
                      <span className="text-white font-black text-sm">
                        {step.step}
                      </span>
                    </div>
                    {i < process.length - 1 && (
                      <div className="w-0.5 flex-1 bg-brand-teal/20 my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-bold text-brand-text text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/assets/generated/about-before-after.dim_800x500.jpg"
                alt="Before and after aerial view of site regrading"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-brand-teal font-black text-2xl">
                        Before
                      </p>
                      <p className="text-white/70 text-xs">
                        Uneven terrain, poor drainage
                      </p>
                    </div>
                    <div className="w-px bg-white/30" />
                    <div>
                      <p className="text-brand-teal font-black text-2xl">
                        After
                      </p>
                      <p className="text-white/70 text-xs">
                        Certified grade, ready to build
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section
        className="section-padding bg-brand-slate"
        data-ocid="about.values_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose Buildify
            </h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border border-white/10 rounded-2xl p-7 hover:border-brand-teal/50 hover:bg-white/5 transition-all group"
                data-ocid={`about.value_card.${i + 1}`}
              >
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-teal transition-colors">
                  <value.icon
                    size={22}
                    className="text-brand-teal group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Gallery ── */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="about.gallery_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
              Our Work in the Field
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              Project Gallery
            </h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.caption}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-xl overflow-hidden shadow-md aspect-[4/3]"
                data-ocid={`about.gallery_item.${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold text-sm">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="about.leadership_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
              The Specialists Behind Every Site
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              Our Leadership Team
            </h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                data-ocid={`about.leader_card.${i + 1}`}
              >
                <div className="aspect-square overflow-hidden bg-brand-bg">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-text text-base mb-0.5">
                    {leader.name}
                  </h3>
                  <p className="text-brand-teal text-xs font-semibold mb-3">
                    {leader.role}
                  </p>
                  <p className="text-brand-muted text-xs leading-relaxed mb-4">
                    {leader.bio}
                  </p>
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name} LinkedIn`}
                    className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold hover:underline"
                    data-ocid={`about.leader_link.${i + 1}`}
                  >
                    <Linkedin size={13} />
                    View Profile
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-muted text-sm hover:text-brand-teal transition-colors"
              data-ocid="about.team_link"
            >
              <Users size={16} />
              Meet the full team
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team in the Field ── */}
      <section
        className="relative overflow-hidden"
        data-ocid="about.field_section"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/about-team-field.dim_800x600.jpg"
            alt="Buildify team reviewing grading plans on site"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "oklch(0.15 0.02 50 / 0.75)" }}
          />
        </div>
        <div className="relative z-10 py-24 px-4">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <Award className="text-brand-teal" size={28} />
                <p className="text-brand-teal text-xs font-bold uppercase tracking-widest">
                  Recognised Industry Leader
                </p>
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
                "Proper grading is the single most important thing you can do
                before a foundation is poured — and it's the one step most
                developers underestimate."
              </blockquote>
              <p className="text-white/70 font-medium">
                Marcus Harrington — Site Grading Director, Buildify
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="bg-brand-slate section-padding"
        data-ocid="about.cta_section"
      >
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mountain className="text-brand-teal" size={26} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Site?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Tell us about your project. We'll provide a free site assessment
              and grading plan within 48 hours — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                data-ocid="about.cta_primary_button"
              >
                Get a Free Quote
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold text-sm uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors"
                data-ocid="about.cta_secondary_button"
              >
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
