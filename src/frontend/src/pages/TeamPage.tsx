import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  HardHat,
  Heart,
  Lightbulb,
  Linkedin,
  Mail,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Department =
  | "All"
  | "Leadership"
  | "Engineering"
  | "Operations"
  | "Design";

interface TeamMember {
  name: string;
  role: string;
  department: Exclude<Department, "All">;
  bio: string;
  photo: string;
  email: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    department: "Leadership",
    bio: "20+ years shaping Buildify's vision. Rajesh led over 300 projects across Maharashtra and Gujarat before founding the company in 2004. He champions safety-first culture and client transparency.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
    email: "rajesh@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Priya Sharma",
    role: "Chief Operations Officer",
    department: "Leadership",
    bio: "Priya manages all site operations and supply-chain workflows across active projects. Her background in civil engineering and lean construction keeps timelines tight and costs predictable.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    email: "priya@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Engineering",
    department: "Engineering",
    bio: "Arjun holds dual certifications in structural engineering and BIM. He oversees all technical design reviews, structural calculations, and ensures every build meets the latest IS code standards.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    email: "arjun@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sneha Patel",
    role: "Senior Civil Engineer",
    department: "Engineering",
    bio: "Sneha specialises in foundation engineering and site regrading. She has delivered complex land-grading projects on slopes and flood-prone sites across western India with zero structural defects.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    email: "sneha@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Vikram Singh",
    role: "Project Manager",
    department: "Operations",
    bio: "Vikram coordinates multi-trade crews on mid-to-large commercial builds. His milestone-based tracking approach consistently delivers projects 5–10% under the contracted timeline.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
    email: "vikram@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ananya Joshi",
    role: "Site Supervisor",
    department: "Operations",
    bio: "Ananya oversees daily site operations for residential and mixed-use projects. She is a certified ISO 45001 safety officer and runs toolbox talks for every crew before each shift begins.",
    photo:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&q=80",
    email: "ananya@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Rohan Desai",
    role: "Lead Architect",
    department: "Design",
    bio: "Rohan leads design development from concept to construction documents. His work blends functional clarity with aesthetic boldness, producing structures that serve people and elevate the skyline.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
    email: "rohan@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Kavita Nair",
    role: "Interior Design Lead",
    department: "Design",
    bio: "Kavita transforms raw structures into liveable, inspiring spaces. Specialising in commercial interiors and residential fit-outs, she has delivered 80+ award-shortlisted interior projects.",
    photo:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&q=80",
    email: "kavita@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Manish Tiwari",
    role: "MEP Engineer",
    department: "Engineering",
    bio: "Manish coordinates mechanical, electrical, and plumbing systems across all active builds. His integration approach reduces rework costs by ensuring MEP drawings are clash-checked before construction begins.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    email: "manish@buildify.in",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Deepa Rao",
    role: "Procurement Manager",
    department: "Operations",
    bio: "Deepa manages supplier relationships for 150+ vetted vendors. Her negotiation skills and bulk purchasing strategies have saved Buildify clients an average of 12% on material costs per project.",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&q=80",
    email: "deepa@buildify.in",
    linkedin: "https://linkedin.com",
  },
];

const statsData = [
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 20, suffix: "+", label: "Years Combined Exp." },
  { value: 15, suffix: "+", label: "Certified Experts" },
  { value: 100, suffix: "%", label: "Project Success" },
];

const cultureValues = [
  {
    icon: Shield,
    title: "Safety Is Non-Negotiable",
    description:
      "Every team member completes site-safety certification and participates in daily briefings. We go home the same way we arrived — healthy.",
  },
  {
    icon: Heart,
    title: "People First",
    description:
      "We invest in career growth, fair pay, and a supportive work environment. Happy teams build better projects.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "Annual training budgets, BIM certification support, and leadership coaching ensure our team stays at the forefront of construction technology.",
  },
  {
    icon: Target,
    title: "Ownership Mindset",
    description:
      "Every Buildify team member takes full responsibility for their work. No blame culture — just honest accountability and rapid problem-solving.",
  },
];

const departments: Department[] = [
  "All",
  "Leadership",
  "Engineering",
  "Operations",
  "Design",
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
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

// ─── Department Badge ─────────────────────────────────────────────────────────

const deptColors: Record<Exclude<Department, "All">, string> = {
  Leadership: "bg-brand-teal/10 text-brand-teal",
  Engineering: "bg-blue-50 text-blue-700",
  Operations: "bg-amber-50 text-amber-700",
  Design: "bg-purple-50 text-purple-700",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [activeDept, setActiveDept] = useState<Department>("All");

  const filtered =
    activeDept === "All"
      ? teamMembers
      : teamMembers.filter((m) => m.department === activeDept);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-16 md:pt-20 overflow-x-hidden"
      data-ocid="team.page"
    >
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center"
        data-ocid="team.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/team-hero.dim_1400x600.jpg')",
          }}
        />
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
              <Users size={14} />
              The People Behind Every Build
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black text-white leading-tight mb-6"
            >
              Meet Our Dedicated <span className="text-brand-teal">Team</span>{" "}
              of Experts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              Dedicated professionals from engineering, architecture, and
              operations — united by a passion for building what matters.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("team-grid")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px] w-full sm:w-auto"
                data-ocid="team.hero_cta_button"
              >
                Meet the Team <ArrowRight size={16} />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors min-h-[44px] w-full sm:w-auto"
                data-ocid="team.hero_contact_button"
              >
                Join Our Team
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
              data-ocid="team.home_link"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-teal">Team</span>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        className="bg-brand-teal py-12 sm:py-14 md:py-16"
        data-ocid="team.stats_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                data-ocid={`team.stat.${i + 1}`}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Department Filter + Team Grid ── */}
      <section
        id="team-grid"
        className="bg-brand-bg py-12 sm:py-16 lg:py-20"
        data-ocid="team.grid_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Our People
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text mb-4"
            >
              Skilled Professionals, One Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-brand-muted text-sm sm:text-lg max-w-2xl mx-auto"
            >
              Browse by department to discover the expertise behind every
              Buildify project.
            </motion.p>
          </div>

          {/* Department tabs — flex-wrap so they wrap on mobile */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
            role="tablist"
            data-ocid="team.dept_filter"
          >
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                role="tab"
                aria-selected={activeDept === dept}
                onClick={() => setActiveDept(dept)}
                className={`py-2 px-3 sm:px-5 rounded-full text-sm font-semibold transition-all min-h-[40px] ${
                  activeDept === dept
                    ? "bg-brand-teal text-white shadow-md"
                    : "bg-white text-brand-muted border border-border hover:border-brand-teal hover:text-brand-teal"
                }`}
                data-ocid={`team.dept_tab.${dept.toLowerCase()}`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {filtered.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-shadow group"
                data-ocid={`team.member_card.${i + 1}`}
              >
                {/* Photo */}
                <div className="relative overflow-hidden h-52 sm:h-56">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Social icons on hover */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white transition-colors"
                      data-ocid={`team.member_email.${i + 1}`}
                    >
                      <Mail size={14} className="text-brand-text" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white transition-colors"
                      data-ocid={`team.member_linkedin.${i + 1}`}
                    >
                      <Linkedin size={14} className="text-brand-text" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-brand-text font-black text-base sm:text-lg leading-tight truncate">
                        {member.name}
                      </h3>
                      <p className="text-brand-teal font-semibold text-sm mt-0.5">
                        {member.role}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${deptColors[member.department]}`}
                    >
                      {member.department}
                    </span>
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Bottom action */}
                  <div className="mt-4 sm:mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="text-brand-muted hover:text-brand-teal transition-colors"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-brand-muted hover:text-brand-teal transition-colors"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>
                    <span className="text-xs text-brand-muted uppercase tracking-wider font-semibold">
                      {member.department}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture & Values ── */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "oklch(0.318 0.042 213.5)" }}
        data-ocid="team.culture_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              How We Work
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
            >
              Our Culture &amp; Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-white/60 text-sm sm:text-lg max-w-2xl mx-auto"
            >
              The principles that guide every decision, every day on every
              Buildify site.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {cultureValues.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-teal/40 rounded-2xl p-6 sm:p-7 transition-all group"
                data-ocid={`team.culture_card.${i + 1}`}
              >
                <div className="w-12 h-12 bg-brand-teal/15 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <val.icon size={22} className="text-brand-teal" />
                </div>
                <h3 className="text-white font-bold text-base mb-3">
                  {val.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Departments Overview Strip ── */}
      <section
        className="bg-brand-bg py-12 sm:py-16"
        data-ocid="team.departments_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
              How We're Structured
            </p>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-black text-brand-text"
            >
              Expert Departments, One Direction
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: Award,
                dept: "Leadership",
                count: "2",
                desc: "Strategic direction & client relationships",
              },
              {
                icon: HardHat,
                dept: "Engineering",
                count: "3",
                desc: "Structural, MEP & site engineering",
              },
              {
                icon: Briefcase,
                dept: "Operations",
                count: "3",
                desc: "Site management & procurement",
              },
              {
                icon: Users,
                dept: "Design",
                count: "2",
                desc: "Architecture & interior design",
              },
            ].map((item, i) => (
              <motion.button
                key={item.dept}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                onClick={() => {
                  setActiveDept(item.dept as Department);
                  document
                    .getElementById("team-grid")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white border border-border rounded-2xl p-4 sm:p-6 text-left hover:border-brand-teal hover:shadow-card-hover transition-all group"
                data-ocid={`team.dept_card.${i + 1}`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-brand-teal group-hover:scale-110 transition-all">
                  <item.icon
                    size={18}
                    className="text-brand-teal group-hover:text-white transition-colors"
                  />
                </div>
                <p className="text-brand-text font-black text-base sm:text-lg">
                  {item.dept}
                </p>
                <p className="text-brand-teal text-sm font-bold">
                  {item.count} members
                </p>
                <p className="text-brand-muted text-xs mt-1 leading-snug">
                  {item.desc}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Our Team CTA ── */}
      <section
        className="bg-brand-slate py-12 sm:py-16 lg:py-20"
        data-ocid="team.cta_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Grow With Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              Join Our Team
            </h2>
            <p className="text-white/60 text-sm sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              We're always looking for skilled engineers, project managers,
              architects, and site supervisors who share our commitment to
              excellence. Apply today and build your career at Buildify.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white text-sm font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px] w-full sm:w-auto"
                data-ocid="team.cta_positions_button"
              >
                View Open Positions <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors min-h-[44px] w-full sm:w-auto"
                data-ocid="team.cta_about_button"
              >
                About Buildify
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
