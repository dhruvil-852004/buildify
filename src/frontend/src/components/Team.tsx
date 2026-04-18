import { Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";

const team = [
  {
    image: "/assets/generated/team-ceo.dim_300x300.jpg",
    name: "Marcus Harrington",
    role: "Chief Executive Officer",
    bio: "25+ years leading landmark construction projects across North America.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    image: "/assets/generated/team-coo.dim_300x300.jpg",
    name: "Sophia Chen",
    role: "Chief Operating Officer",
    bio: "Operations strategist with a track record of delivering complex builds on time.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    image: "/assets/generated/team-director.dim_300x300.jpg",
    name: "James Okafor",
    role: "Director of Projects",
    bio: "Licensed architect and project director overseeing our commercial portfolio.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    image: "/assets/generated/team-engineer.dim_300x300.jpg",
    name: "Elena Vasquez",
    role: "Chief Engineer",
    bio: "Structural engineering specialist with expertise in sustainable high-rise construction.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

export default function Team() {
  return (
    <section id="team" className="section-padding bg-brand-bg">
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
            Meet Our Leadership
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
            Our Team
          </h2>
          <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Team cards — staggered entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="text-center group"
              data-ocid={`team.card.${i + 1}`}
            >
              <div className="relative w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-card group-hover:border-brand-teal transition-colors">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-brand-text text-lg">
                {member.name}
              </h3>
              <p className="text-brand-teal text-sm font-semibold mt-1 mb-3">
                {member.role}
              </p>
              <p className="text-brand-muted text-sm leading-relaxed">
                {member.bio}
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  data-ocid={`team.link.${i + 1}`}
                >
                  <Linkedin size={14} />
                </motion.a>
                <motion.a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Twitter`}
                  className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  data-ocid={`team.link.${i + 1}`}
                >
                  <Twitter size={14} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
