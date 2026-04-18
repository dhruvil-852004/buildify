import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe,
  Handshake,
  HardHat,
  Lightbulb,
  Mail,
  Phone,
  Send,
  Shield,
  Star,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const partnerTypes = [
  {
    icon: Wrench,
    title: "Subcontractors",
    description:
      "Skilled trade specialists — civil, MEP, structural steel, finishing — who want steady project pipelines and long-term collaboration.",
    tags: ["Civil Works", "MEP", "Steel & Structure", "Finishing Trades"],
    accent: "bg-brand-teal",
    borderColor: "border-brand-teal/20 hover:border-brand-teal/60",
  },
  {
    icon: Globe,
    title: "Material Suppliers",
    description:
      "Manufacturers and distributors of construction materials, equipment, and technology products aligned with our quality standards.",
    tags: ["Cement & Steel", "Tiles & Flooring", "Electrical", "Plumbing"],
    accent: "bg-brand-orange",
    borderColor: "border-brand-orange/20 hover:border-brand-orange/60",
  },
  {
    icon: Lightbulb,
    title: "Design Consultants",
    description:
      "Architects, structural engineers, MEP consultants, and interior designers who want to collaborate on landmark projects.",
    tags: ["Architecture", "Structural", "Interior Design", "Landscape"],
    accent: "bg-brand-tan",
    borderColor: "border-brand-tan/20 hover:border-brand-tan/60",
  },
  {
    icon: TrendingUp,
    title: "Real Estate Developers",
    description:
      "Land owners and developers looking for a construction partner with the capacity, track record, and systems to deliver at scale.",
    tags: ["Residential", "Commercial", "Mixed-Use", "Industrial"],
    accent: "bg-brand-slate",
    borderColor: "border-border hover:border-brand-slate/50",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Trusted Brand Association",
    description:
      "Align your business with a Top 50 Construction firm. Our name carries weight with clients, financiers, and regulatory bodies across India.",
  },
  {
    icon: Briefcase,
    title: "Consistent Project Pipeline",
    description:
      "500+ completed projects and a growing order book means our partners enjoy steady, long-term workstreams — not one-off engagements.",
  },
  {
    icon: Shield,
    title: "Structured Payment Terms",
    description:
      "We honour milestone-based payments on time, every time. Our finance team handles procurement compliance and GST reconciliation smoothly.",
  },
  {
    icon: FileText,
    title: "Clear Contracts & Scope",
    description:
      "No ambiguity. Every engagement is governed by professionally drafted agreements, detailed BoQs, and written change-order processes.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Weekly coordination meetings, shared site dashboards, and a dedicated partner liaison ensure you're never out of the loop.",
  },
  {
    icon: Star,
    title: "Performance Rewards",
    description:
      "Top-performing partners earn preferred status — first-access to new projects, better payment milestones, and featured case studies.",
  },
];

const process = [
  {
    step: "01",
    icon: Send,
    title: "Submit Expression of Interest",
    description:
      "Complete the partnership form below. Tell us about your capabilities, certifications, and the type of work you're seeking.",
  },
  {
    step: "02",
    icon: Users,
    title: "Initial Screening Call",
    description:
      "Our partnerships team will reach out within 48 hours for a 30-minute discovery call to understand the fit.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Documentation & Vetting",
    description:
      "Submit company documents, certifications, and past project references. We verify credentials and assess capacity.",
  },
  {
    step: "04",
    icon: Handshake,
    title: "Partnership Agreement",
    description:
      "Sign our standard partnership framework agreement and get onboarded into our vendor management system.",
  },
  {
    step: "05",
    icon: HardHat,
    title: "First Project Assignment",
    description:
      "Get matched to an active project aligned with your expertise, scale, and geography. Build starts here.",
  },
];

const testimonials = [
  {
    name: "Rajan Mehta",
    role: "Director, Mehta Electricals Pvt. Ltd.",
    quote:
      "Partnering with Buildify transformed our business. In 3 years, we've completed 22 projects together — every one delivered on time, with zero payment disputes. Their professionalism sets the benchmark.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Principal Architect, Studio N",
    quote:
      "Buildify treats design consultants as true collaborators, not vendors. Their project managers understand construction realities and actually implement our design intent — rare in this industry.",
    stars: 5,
  },
  {
    name: "Suresh Khatri",
    role: "MD, Khatri Structural Engineers",
    quote:
      "The transparency is remarkable. Access to live project dashboards, prompt responses, and a team that actually plans ahead. We've turned down other clients to keep capacity for Buildify projects.",
    stars: 5,
  },
];

const stats = [
  { value: "180+", label: "Active Partners" },
  { value: "₹850Cr", label: "Partner Payments YTD" },
  { value: "94%", label: "Partner Retention Rate" },
  { value: "48h", label: "Avg. Response Time" },
];

const partnerCategories = [
  "Subcontractor",
  "Material Supplier",
  "Design Consultant",
  "Real Estate Developer",
  "Technology Partner",
  "Other",
];

// ─── Components ────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  const stars = ["a", "b", "c", "d", "e"].slice(0, count);
  return (
    <div className="flex gap-0.5 mb-4">
      {stars.map((id) => (
        <Star key={id} size={14} className="text-brand-orange fill-current" />
      ))}
    </div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          data-ocid={`partner.stat.${i + 1}`}
        >
          <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
            {stat.value}
          </p>
          <p className="text-white/70 text-xs sm:text-sm font-medium uppercase tracking-wide">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 sm:py-16"
        data-ocid="partner.success_state"
      >
        <div className="w-20 h-20 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-brand-teal" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-brand-text mb-3">
          Expression of Interest Received!
        </h3>
        <p className="text-brand-muted text-sm sm:text-base max-w-md mx-auto mb-8">
          Thank you for your interest in partnering with Buildify. Our
          partnerships team will review your submission and reach out within 48
          business hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-brand-teal text-sm font-semibold hover:underline"
          data-ocid="partner.submit_another_button"
        >
          Submit another form
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="partner.form"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-brand-text mb-1.5"
          >
            Full Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Rajesh Kumar"
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition"
            data-ocid="partner.name_input"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-brand-text mb-1.5"
          >
            Company Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="company"
            type="text"
            required
            placeholder="Buildworks Pvt. Ltd."
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition"
            data-ocid="partner.company_input"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-brand-text mb-1.5"
          >
            Email Address <span className="text-brand-orange">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="rajesh@buildworks.in"
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition"
            data-ocid="partner.email_input"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-brand-text mb-1.5"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition"
            data-ocid="partner.phone_input"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-brand-text mb-1.5"
        >
          Partnership Category <span className="text-brand-orange">*</span>
        </label>
        <div className="relative">
          <button
            id="category"
            type="button"
            onClick={() => setOpenSelect((p) => !p)}
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition min-h-[44px]"
            data-ocid="partner.category_select"
            aria-haspopup="listbox"
            aria-expanded={openSelect}
          >
            <span
              className={category ? "text-brand-text" : "text-brand-muted/60"}
            >
              {category || "Select a category…"}
            </span>
            <ChevronDown
              size={16}
              className={`text-brand-muted transition-transform ${openSelect ? "rotate-180" : ""}`}
            />
          </button>
          {openSelect && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-20 overflow-hidden">
              {partnerCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setOpenSelect(false);
                  }}
                  className="w-full px-4 py-3 text-sm text-left hover:bg-brand-teal/5 hover:text-brand-teal transition-colors"
                  data-ocid={`partner.category_option.${partnerCategories.indexOf(cat) + 1}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Years + Geography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="years"
            className="block text-sm font-semibold text-brand-text mb-1.5"
          >
            Years in Business
          </label>
          <input
            id="years"
            type="number"
            min="0"
            placeholder="e.g. 8"
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition"
            data-ocid="partner.years_input"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-brand-text mb-1.5"
          >
            Primary City / Region
          </label>
          <input
            id="location"
            type="text"
            placeholder="Mumbai, Maharashtra"
            className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition"
            data-ocid="partner.location_input"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-brand-text mb-1.5"
        >
          Tell Us About Your Capabilities{" "}
          <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Describe your services, team size, past projects, and what kind of partnership you're looking for…"
          className="w-full px-4 py-3 text-base rounded-xl border border-input bg-white text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 transition resize-none"
          data-ocid="partner.message_textarea"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-teal text-white text-sm font-bold uppercase tracking-wide px-8 sm:px-10 py-4 rounded-full hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px]"
        data-ocid="partner.submit_button"
      >
        Submit Expression of Interest <ArrowRight size={16} />
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-16 md:pt-20 overflow-x-hidden"
      data-ocid="partner.page"
    >
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center"
        data-ocid="partner.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/partner-hero.dim_1400x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-brand-slate opacity-85" />

        {/* Geometric accents */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.536 0.098 196.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.536 0.098 196.3) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div
          className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.536 0.098 196.3) 0%, transparent 70%)",
          }}
        />
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
              <Handshake size={14} />
              Grow With Buildify
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black text-white leading-tight mb-6"
            >
              Build a Stronger <span className="text-brand-teal">Business</span>{" "}
              Together
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              Join Buildify's trusted network of contractors, suppliers,
              consultants, and developers. We believe the best structures are
              built by the best partnerships.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="#partner-form"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px] w-full sm:w-auto"
                data-ocid="partner.hero_cta_button"
              >
                Apply to Partner <ArrowRight size={16} />
              </a>
              <a
                href="#partner-types"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors min-h-[44px] w-full sm:w-auto"
                data-ocid="partner.hero_learn_button"
              >
                Who We Partner With
              </a>
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
              data-ocid="partner.home_link"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-teal">Partner With Us</span>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section
        className="bg-brand-teal py-12 sm:py-14"
        data-ocid="partner.stats_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <StatsStrip />
        </div>
      </section>

      {/* ── Partner Types ── */}
      <section
        id="partner-types"
        className="bg-brand-bg py-12 sm:py-16 lg:py-20"
        data-ocid="partner.types_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Partnership Categories
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text mb-4"
            >
              Who We Partner With
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-brand-muted text-sm sm:text-lg max-w-2xl mx-auto"
            >
              Whether you execute on-site, supply materials, design spaces, or
              fund developments — there's a place for you in the Buildify
              ecosystem.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
            {partnerTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`bg-white rounded-2xl p-6 sm:p-8 border ${type.borderColor} shadow-sm hover:shadow-lg transition-all group`}
                data-ocid={`partner.type_card.${i + 1}`}
              >
                <div className="flex items-start gap-4 sm:gap-5 mb-5">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${type.accent} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <type.icon size={24} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-black text-brand-text mb-1">
                      {type.title}
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {type.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-brand-muted bg-muted px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "oklch(0.318 0.042 213.5)" }}
        data-ocid="partner.benefits_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-3">
              The Buildify Partnership Advantage
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
            >
              Why Partner With Us?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-white/60 text-sm sm:text-lg max-w-2xl mx-auto"
            >
              We don't just give you work — we invest in your growth, your
              reputation, and your long-term success.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-teal/30 rounded-2xl p-6 sm:p-7 transition-all group"
                data-ocid={`partner.benefit_card.${i + 1}`}
              >
                <div className="w-12 h-12 bg-brand-teal/15 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <benefit.icon size={22} className="text-brand-teal" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        className="bg-brand-bg py-12 sm:py-16 lg:py-20"
        data-ocid="partner.process_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Getting Started
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text mb-4"
            >
              How the Partnership Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-brand-muted text-sm sm:text-lg max-w-xl mx-auto"
            >
              A simple, transparent five-step process from your first expression
              of interest to your first Buildify project assignment.
            </motion.p>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="relative mb-8">
              <div className="absolute top-9 left-[10%] right-[10%] h-0.5 bg-border" />
              <div className="grid grid-cols-5 gap-4">
                {process.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="flex flex-col items-center text-center"
                    data-ocid={`partner.process_step.${i + 1}`}
                  >
                    <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-white border-2 border-brand-teal flex flex-col items-center justify-center shadow-sm mb-5">
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

          {/* Mobile */}
          <div className="md:hidden space-y-0">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex gap-4 sm:gap-5"
                data-ocid={`partner.process_step_mobile.${i + 1}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-teal flex flex-col items-center justify-center shadow-sm shrink-0">
                    <span className="text-brand-orange text-[9px] font-black uppercase leading-none">
                      {step.step}
                    </span>
                    <step.icon size={14} className="text-brand-teal" />
                  </div>
                  {i < process.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-2 min-h-[32px]" />
                  )}
                </div>
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

      {/* ── Testimonials ── */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "oklch(0.94 0.005 220)" }}
        data-ocid="partner.testimonials_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Partner Voices
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text mb-4"
            >
              What Our Partners Say
            </motion.h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-border hover:shadow-lg transition-shadow"
                data-ocid={`partner.testimonial_card.${i + 1}`}
              >
                <StarRating count={t.stars} />
                <p className="text-brand-text text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-brand-teal/15 flex items-center justify-center shrink-0">
                    <span className="text-brand-teal font-black text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-brand-text font-bold text-sm">
                      {t.name}
                    </p>
                    <p className="text-brand-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Channels ── */}
      <section
        className="bg-brand-bg py-12 sm:py-14"
        data-ocid="partner.contact_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-border shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-brand-teal" />
                </div>
                <div>
                  <p className="text-brand-text font-bold text-sm mb-1">
                    Email Us
                  </p>
                  <a
                    href="mailto:partners@buildify.in"
                    className="text-brand-teal text-sm font-medium hover:underline break-all"
                    data-ocid="partner.email_link"
                  >
                    partners@buildify.in
                  </a>
                  <p className="text-brand-muted text-xs mt-1">
                    We respond within 48 business hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-brand-orange" />
                </div>
                <div>
                  <p className="text-brand-text font-bold text-sm mb-1">
                    Call Us
                  </p>
                  <a
                    href="tel:+912242001234"
                    className="text-brand-orange text-sm font-medium hover:underline"
                    data-ocid="partner.phone_link"
                  >
                    +91 22 4200 1234
                  </a>
                  <p className="text-brand-muted text-xs mt-1">
                    Mon–Fri, 9 AM – 6 PM IST
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-tan/15 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-brand-tan" />
                </div>
                <div>
                  <p className="text-brand-text font-bold text-sm mb-1">
                    Head Office
                  </p>
                  <p className="text-brand-muted text-sm">
                    Buildify House, BKC, Mumbai
                  </p>
                  <p className="text-brand-muted text-xs mt-1">
                    Maharashtra 400051
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section
        id="partner-form"
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "oklch(0.94 0.005 220)" }}
        data-ocid="partner.form_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
                Apply Now
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text mb-5 leading-tight">
                Express Your <span className="text-brand-teal">Interest</span>
              </h2>
              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                Fill out the form and our partnerships team will review your
                profile. Approved partners are onboarded within 5–7 working
                days.
              </p>

              {/* Checklist */}
              <ul className="space-y-3">
                {[
                  "No registration fees or hidden charges",
                  "Dedicated partner relationship manager",
                  "Access to live project dashboards",
                  "Transparent milestone-based payments",
                  "Annual partner appreciation programme",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-brand-text"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-brand-teal mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Certifications note */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-white rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={18} className="text-brand-teal shrink-0" />
                  <p className="text-brand-text font-semibold text-sm">
                    What to have ready
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-brand-muted">
                  {[
                    "Company registration certificate",
                    "GST / PAN details",
                    "MSME / Udyam certificate (if applicable)",
                    "3 recent project references",
                    "ISO / trade certifications (if any)",
                  ].map((doc) => (
                    <li key={doc} className="flex items-center gap-2">
                      <Zap size={10} className="text-brand-orange shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-sm"
            >
              <PartnerForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="bg-brand-slate py-12 sm:py-16 lg:py-20"
        data-ocid="partner.cta_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Handshake className="text-brand-teal" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Let's Build the Future Together
            </h2>
            <p className="text-white/60 text-sm sm:text-lg mb-8 sm:mb-9">
              500+ projects. 180+ active partners. Join a network that rewards
              excellence and invests in your long-term success.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#partner-form"
                className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white text-sm font-bold uppercase tracking-wide px-8 sm:px-9 py-4 rounded-full hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px] w-full sm:w-auto"
                data-ocid="partner.cta_primary_button"
              >
                Apply Now <ArrowRight size={16} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 sm:px-9 py-4 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors min-h-[44px] w-full sm:w-auto"
                data-ocid="partner.cta_contact_button"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
