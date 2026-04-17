import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  HardHat,
  Home,
  Lightbulb,
  Shield,
  Star,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: HardHat,
    title: "General Contracting",
    tagline: "End-to-end project delivery",
    description:
      "We manage every phase of construction under a single contract — from site preparation and structural work to finishes and handover. Our full-service model eliminates coordination gaps, keeps costs predictable, and ensures every trade is accountable to one team.",
    features: [
      "Complete turnkey project management",
      "Licensed subcontractor network",
      "Cost-plus and lump-sum contracts",
      "Transparent reporting & milestone billing",
      "Warranty-backed delivery",
    ],
    accent: "bg-brand-teal",
    accentText: "text-brand-teal",
    borderHover: "hover:border-brand-teal/40",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    tagline: "Precision planning & oversight",
    description:
      "Our dedicated project managers bring structured discipline to complex builds. Using industry-leading tools and real-time dashboards, we track schedules, manage risks, coordinate teams, and keep stakeholders informed at every milestone throughout the lifecycle.",
    features: [
      "BIM-based scheduling & visualisation",
      "Risk register & mitigation planning",
      "Procurement & vendor management",
      "Weekly progress dashboards",
      "Budget variance monitoring",
    ],
    accent: "bg-brand-orange",
    accentText: "text-brand-orange",
    borderHover: "hover:border-brand-orange/40",
  },
  {
    icon: Home,
    title: "Residential Builds",
    tagline: "Crafted homes, lasting memories",
    description:
      "From luxury bungalows to apartment complexes, we bring residential visions to life with craftsmanship and care. We integrate design, structure, and sustainable materials to deliver homes that are beautiful, safe, and built for generations of living.",
    features: [
      "Custom villa & bungalow construction",
      "Multi-unit residential complexes",
      "Interior fit-out & millwork",
      "Green building certifications (GRIHA/LEED)",
      "Dedicated client liaison throughout",
    ],
    accent: "bg-brand-tan",
    accentText: "text-brand-tan",
    borderHover: "hover:border-brand-tan/40",
  },
  {
    icon: Building2,
    title: "Commercial Development",
    tagline: "Spaces that drive business",
    description:
      "We design and build high-performance commercial properties — office towers, retail centres, hospitality venues, and industrial facilities. Our team understands the business economics behind every square foot and delivers ROI-focused spaces on time and on budget.",
    features: [
      "Grade-A office & corporate campus builds",
      "Retail & hospitality fit-outs",
      "Industrial warehouse & logistics hubs",
      "MEP coordination & smart-building integration",
      "Post-handover facilities management",
    ],
    accent: "bg-brand-slate",
    accentText: "text-brand-text",
    borderHover: "hover:border-brand-slate/40",
  },
];

const strengths = [
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "15+ years and 500+ delivered projects across India speak for themselves. Every project is a reference.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "ISO 45001-aligned safety protocols on every site. Zero-incident targets — always, not occasionally.",
  },
  {
    icon: Star,
    title: "Uncompromising Quality",
    description:
      "Rigorous quality control at every phase. We build to last, not to spec minimums.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    description:
      "BIM modelling, drone surveys, and prefab techniques keep our builds precise and efficient.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "120+ licensed engineers, architects, and skilled tradespeople dedicated to your project.",
  },
  {
    icon: TrendingUp,
    title: "On-Time Delivery",
    description:
      "94% of Buildify projects are handed over on or ahead of the contracted date.",
  },
];

const processSteps = [
  {
    step: "01",
    icon: Users,
    title: "Consultation",
    description:
      "Free on-site meeting to understand your brief, site conditions, budget, and timeline expectations.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Planning",
    description:
      "Detailed scope of work, preliminary cost plan, and procurement strategy agreed with you.",
  },
  {
    step: "03",
    icon: Lightbulb,
    title: "Design",
    description:
      "BIM-based design development, regulatory approvals, and value-engineering reviews.",
  },
  {
    step: "04",
    icon: HardHat,
    title: "Construction",
    description:
      "Site mobilisation, phased construction with weekly progress reporting and quality audits.",
  },
  {
    step: "05",
    icon: CheckCircle2,
    title: "Handover",
    description:
      "Snagging, final inspections, certification, and a full handover pack delivered to you.",
  },
];

const statsData = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 120, suffix: "+", label: "Team Members" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="pt-16 md:pt-20" data-ocid="services.page">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-[460px] md:min-h-[560px] flex items-center"
        data-ocid="services.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/services-hero.dim_1400x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-brand-slate opacity-80" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.536 0.098 196.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.536 0.098 196.3) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Orange diagonal accent */}
        <div
          className="absolute -right-32 top-0 w-96 h-full opacity-10"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, oklch(0.661 0.196 38.6) 100%)",
          }}
        />

        <div className="container-max px-4 md:px-6 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-left"
          >
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-4">
              What We Do
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Our <span className="text-brand-teal">Services</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
              From ground-breaking to ribbon-cutting, Buildify delivers
              construction excellence across every project type and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all"
                data-ocid="services.hero_cta_button"
              >
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="/#projects"
                className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors"
                data-ocid="services.hero_projects_button"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-2 mt-12 text-white/50 text-sm"
          >
            <Link
              to="/"
              className="hover:text-brand-teal transition-colors"
              data-ocid="services.home_link"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-teal">Services</span>
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section
        className="bg-brand-bg section-padding"
        data-ocid="services.grid_section"
      >
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Core Offerings
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-text mb-4">
              Built for Every Scale
            </h2>
            <p className="text-brand-muted text-lg max-w-2xl mx-auto">
              Whether you're building a family home or a commercial complex, we
              have the expertise, team, and infrastructure to deliver.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`bg-white rounded-2xl p-8 border border-border shadow-card ${svc.borderHover} hover:shadow-card-hover transition-all group`}
                data-ocid={`services.service_card.${i + 1}`}
              >
                {/* Icon + tag */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 ${svc.accent} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <svc.icon size={26} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-brand-muted uppercase tracking-widest pt-1">
                    {svc.tagline}
                  </span>
                </div>

                <h3 className="text-xl font-black text-brand-text mb-3">
                  {svc.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-5">
                  {svc.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {svc.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm text-brand-text"
                    >
                      <CheckCircle2
                        size={15}
                        className={`${svc.accentText} mt-0.5 shrink-0`}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-border">
                  <Link
                    to="/contact"
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${svc.accentText} hover:gap-3 transition-all`}
                    data-ocid={`services.service_card_cta.${i + 1}`}
                  >
                    Discuss This Service <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "oklch(0.318 0.042 213.5)" }}
        data-ocid="services.why_section"
      >
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-3">
              The Buildify Advantage
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We've earned the trust of hundreds of clients by combining
              technical depth, disciplined execution, and genuine care for every
              project outcome.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((str, i) => (
              <motion.div
                key={str.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-teal/30 rounded-2xl p-6 transition-all group"
                data-ocid={`services.strength_card.${i + 1}`}
              >
                <div className="w-11 h-11 bg-brand-teal/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <str.icon size={22} className="text-brand-teal" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  {str.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {str.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section
        className="bg-brand-orange py-16 md:py-20"
        data-ocid="services.stats_section"
      >
        <div className="container-max px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10"
          >
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
              By The Numbers
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Our Performance Speaks
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="text-center"
                data-ocid={`services.stat.${i + 1}`}
              >
                <p className="text-4xl md:text-5xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Timeline ── */}
      <section
        className="bg-brand-bg section-padding"
        data-ocid="services.process_section"
      >
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              How We Work
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-text mb-4">
              Our Process
            </h2>
            <p className="text-brand-muted text-lg max-w-2xl mx-auto">
              A clear, structured approach — from your first call to the day you
              take ownership of your completed project.
            </p>
          </motion.div>

          {/* Desktop timeline */}
          <div className="hidden md:block">
            {/* Connector line */}
            <div className="relative mb-8">
              <div className="absolute top-9 left-[10%] right-[10%] h-0.5 bg-border" />
              <div className="grid grid-cols-5 gap-4">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="flex flex-col items-center text-center"
                    data-ocid={`services.process_step.${i + 1}`}
                  >
                    {/* Circle */}
                    <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-white border-2 border-brand-teal flex flex-col items-center justify-center shadow-card mb-5">
                      <span className="text-brand-orange text-[10px] font-black uppercase tracking-widest leading-none mb-0.5">
                        {step.step}
                      </span>
                      <step.icon size={18} className="text-brand-teal" />
                    </div>
                    <h3 className="text-brand-text font-bold text-sm mb-2">
                      {step.title}
                    </h3>
                    <p className="text-brand-muted text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile timeline — vertical */}
          <div className="md:hidden space-y-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-5"
                data-ocid={`services.process_step_mobile.${i + 1}`}
              >
                {/* Left: line + circle */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-teal flex flex-col items-center justify-center shadow-card shrink-0">
                    <span className="text-brand-orange text-[9px] font-black uppercase leading-none">
                      {step.step}
                    </span>
                    <step.icon size={14} className="text-brand-teal" />
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-2 min-h-[32px]" />
                  )}
                </div>
                {/* Right: text */}
                <div className="pb-6 pt-1">
                  <h3 className="text-brand-text font-bold text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accreditations strip ── */}
      <section
        className="bg-brand-teal py-6"
        data-ocid="services.accreditations_strip"
      >
        <div className="container-max px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white">
            {[
              { icon: Award, label: "ISO 9001 Certified" },
              { icon: Shield, label: "ISO 45001 Safety" },
              { icon: Zap, label: "LEED Accredited" },
              { icon: BarChart3, label: "RERA Registered" },
              { icon: Wrench, label: "MahaRERA Compliant" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <item.icon size={15} className="text-white/70 shrink-0" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="bg-brand-slate section-padding"
        data-ocid="services.cta_section"
      >
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-4">
              Let's Get Started
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              Ready to Build?
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Tell us about your project. Our team will reach out within 24
              hours with a tailored proposal and a no-obligation consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:opacity-90 active:scale-[0.98] transition-all"
                data-ocid="services.cta_contact_button"
              >
                Contact Us <ArrowRight size={16} />
              </Link>
              <a
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors"
                data-ocid="services.cta_projects_button"
              >
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
