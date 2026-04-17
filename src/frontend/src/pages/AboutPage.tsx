import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Lightbulb,
  Linkedin,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "120+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with transparency and honesty in every contract, conversation, and build. No surprises — just straightforward, trustworthy partnerships.",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "Every nail, beam, and finish is executed to the highest standard. We don't cut corners — we build structures that stand for generations.",
  },
  {
    icon: CheckCircle2,
    title: "Safety",
    description:
      "Zero-incident job sites are our baseline. We invest heavily in safety training, equipment, and protocols to protect every worker and client.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "From BIM modeling to sustainable materials, we embrace new technologies that deliver better outcomes faster and with less environmental impact.",
  },
];

const leaders = [
  {
    image: "/assets/generated/team-ceo.dim_300x300.jpg",
    name: "Marcus Harrington",
    role: "Chief Executive Officer",
    bio: "With 25+ years leading landmark construction projects across North America, Marcus founded Buildify in 2009 with the vision of combining world-class craftsmanship with modern project management. He has overseen the delivery of over $2B in construction value.",
    linkedin: "https://linkedin.com",
  },
  {
    image: "/assets/generated/team-coo.dim_300x300.jpg",
    name: "Sophia Chen",
    role: "Chief Operating Officer",
    bio: "Sophia brings deep expertise in operations, logistics, and supply chain to ensure every Buildify project runs on schedule and within budget. She holds an MBA from Stanford and previously led operations at a Fortune 500 construction firm.",
    linkedin: "https://linkedin.com",
  },
  {
    image: "/assets/generated/team-director.dim_300x300.jpg",
    name: "James Okafor",
    role: "Director of Projects",
    bio: "A licensed architect and seasoned project director, James oversees Buildify's entire commercial portfolio. His eye for design detail and commitment to structural excellence have earned him multiple industry awards.",
    linkedin: "https://linkedin.com",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20" data-ocid="about.page">
      {/* Hero Banner */}
      <section className="relative bg-brand-slate overflow-hidden py-24 md:py-32">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.536 0.098 196.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.536 0.098 196.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-max px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              About <span className="text-brand-teal">Buildify</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              For over 15 years, Buildify has been turning ambitious visions
              into enduring structures. From concept to completion, we bring
              unmatched expertise, passion, and precision to every project we
              take on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-brand-teal" data-ocid="about.stats_section">
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
                <p className="text-4xl md:text-5xl font-black text-white mb-2">
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

      {/* Our Story */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="about.story_section"
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
                Built on a Foundation of Trust
              </h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  Buildify was founded in 2009 by Marcus Harrington with a
                  simple but powerful mission: to build better buildings and
                  better relationships. Starting with a small team of five, we
                  tackled our first residential projects in San Francisco with
                  relentless attention to craft and client communication.
                </p>
                <p>
                  Over the next decade, word spread. Clients trusted us with
                  larger, more complex commercial developments. We grew — not by
                  chasing volume, but by saying yes only when we could truly
                  deliver excellence. Today, with 120+ professionals across
                  design, engineering, and construction, we operate across
                  California, Nevada, and Washington State.
                </p>
                <p>
                  Our mission remains unchanged: deliver structures that outlast
                  trends, exceed expectations, and make communities proud. Every
                  project is a legacy, and we build accordingly.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-brand-slate rounded-2xl p-8 md:p-10">
                <h3 className="text-white font-bold text-xl mb-6">
                  Our Mission
                </h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  To design and construct spaces that inspire communities, serve
                  generations, and reflect the highest standards of
                  craftsmanship, safety, and sustainability.
                </p>
                <h3 className="text-white font-bold text-xl mb-4">
                  Our Vision
                </h3>
                <p className="text-white/70 leading-relaxed">
                  To be the most trusted name in construction across the West
                  Coast — known not just for the buildings we create, but for
                  the lasting relationships we forge with every client,
                  community, and collaborator.
                </p>
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-teal rounded-full flex items-center justify-center shrink-0">
                    <Award className="text-white" size={22} />
                  </div>
                  <p className="text-white/60 text-sm">
                    Recognized as a Top 50 Construction Firm in California, 2023
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="section-padding"
        style={{ backgroundColor: "oklch(0.94 0.005 220)" }}
        data-ocid="about.values_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              Our Core Values
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
                className="bg-white rounded-2xl p-7 border border-border hover:shadow-lg transition-shadow group"
                data-ocid={`about.value_card.${i + 1}`}
              >
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-teal transition-colors">
                  <value.icon
                    size={22}
                    className="text-brand-teal group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="font-bold text-brand-text text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section
        className="section-padding bg-brand-bg"
        data-ocid="about.leadership_section"
      >
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
              The People Behind the Build
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              Leadership Team
            </h2>
            <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                data-ocid={`about.leader_card.${i + 1}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-slate">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-brand-text text-xl mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-brand-teal text-sm font-semibold mb-4">
                    {leader.role}
                  </p>
                  <p className="text-brand-muted text-sm leading-relaxed mb-5">
                    {leader.bio}
                  </p>
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name} LinkedIn`}
                    className="inline-flex items-center gap-2 text-brand-teal text-sm font-semibold hover:underline"
                    data-ocid={`about.leader_link.${i + 1}`}
                  >
                    <Linkedin size={15} />
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

      {/* CTA */}
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
              <Zap className="text-brand-teal" size={26} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Let's talk about your next project. Our team is ready to bring
              your vision to life — on time, on budget, and beyond expectation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                data-ocid="about.cta_primary_button"
              >
                Get A Free Quote
              </a>
              <a
                href="/#services"
                className="border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors"
                data-ocid="about.cta_secondary_button"
              >
                Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
