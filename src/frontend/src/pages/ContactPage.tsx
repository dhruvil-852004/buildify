import { Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const contactCards = [
  {
    icon: MapPin,
    label: "Our Office",
    value: "1250 Harbor Blvd, Suite 400",
    sub: "San Francisco, CA 94107",
    accent: "bg-brand-teal",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (415) 800-2200",
    sub: "Mon–Fri, 7am – 6pm PST",
    accent: "bg-brand-tan",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@buildify.com",
    sub: "We reply within 24 hours",
    accent: "bg-brand-orange",
  },
];

const officeHours = [
  { day: "Monday – Friday", hours: "7:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const projectTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Renovation",
  "Infrastructure",
  "Interior Fit-Out",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 md:pt-20" data-ocid="contact.page">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center"
        data-ocid="contact.hero_section"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/contact-hero.dim_1400x600.jpg')",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-slate opacity-80" />
        {/* Subtle teal grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.536 0.098 196.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.536 0.098 196.3) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-max px-4 md:px-6 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Let's Connect
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Let's Build <span className="text-brand-teal">Something</span>{" "}
              Great
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
              Whether you have a question, need a free quote, or are ready to
              kick off your next major project — our team is here and ready to
              make it happen.
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-2 mt-10 text-white/50 text-sm"
          >
            <Link
              to="/"
              className="hover:text-brand-teal transition-colors"
              data-ocid="contact.home_link"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-teal">Contact</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section
        className="bg-brand-bg section-padding"
        data-ocid="contact.info_section"
      >
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-shadow group"
                data-ocid={`contact.info_card.${i + 1}`}
              >
                <div
                  className={`w-13 h-13 w-12 h-12 ${card.accent} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <card.icon size={22} className="text-white" />
                </div>
                <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-2">
                  {card.label}
                </p>
                <p className="text-brand-text font-bold text-lg leading-snug mb-1">
                  {card.value}
                </p>
                <p className="text-brand-muted text-sm">{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Visual Grid */}
      <section
        className="section-padding"
        style={{ backgroundColor: "oklch(0.94 0.005 220)" }}
        data-ocid="contact.form_section"
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 border border-border shadow-card"
            >
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
                Send A Message
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-8">
                Tell Us About Your Project
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-16 gap-5"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">
                    Message Sent!
                  </h3>
                  <p className="text-brand-muted text-center max-w-sm">
                    Thank you for reaching out. A member of our team will be in
                    touch with you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        projectType: "",
                        description: "",
                      });
                    }}
                    className="mt-2 text-sm text-brand-teal font-semibold hover:underline"
                    data-ocid="contact.reset_button"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.form"
                >
                  {/* Full Name + Email */}
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
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Marcus Harrington"
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
                        data-ocid="contact.name_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-brand-text mb-1.5"
                      >
                        Email Address{" "}
                        <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="marcus@buildify.com"
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
                        data-ocid="contact.email_input"
                      />
                    </div>
                  </div>

                  {/* Phone + Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-brand-text mb-1.5"
                      >
                        Phone Number{" "}
                        <span className="text-brand-muted text-xs font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (415) 555-0100"
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
                        data-ocid="contact.phone_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-semibold text-brand-text mb-1.5"
                      >
                        Project Type{" "}
                        <span className="text-brand-orange">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={form.projectType}
                        onChange={handleChange}
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-brand-text bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all appearance-none cursor-pointer"
                        data-ocid="contact.project_type_select"
                      >
                        <option value="" disabled>
                          Select a type…
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-brand-text mb-1.5"
                    >
                      Project Description{" "}
                      <span className="text-brand-orange">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Tell us about your project — location, size, timeline, and any specific requirements…"
                      className="w-full border border-border rounded-lg px-4 py-3 text-sm text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all resize-none"
                      data-ocid="contact.description_textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                    data-ocid="contact.submit_button"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right sidebar: why choose us + office hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Why Buildify card */}
              <div className="bg-brand-slate rounded-2xl p-7 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-teal/20 rounded-lg flex items-center justify-center">
                    <Building2 size={20} className="text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-lg">Why Choose Buildify?</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "15+ years of proven expertise",
                    "500+ successful projects delivered",
                    "Licensed, bonded & insured",
                    "Free site consultation & quote",
                    "Dedicated project manager assigned",
                    "On-time delivery guarantee",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-brand-teal mt-0.5 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office Hours card */}
              <div
                className="bg-white rounded-2xl p-7 border border-border shadow-card"
                data-ocid="contact.hours_card"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-lg text-brand-text">
                    Office Hours
                  </h3>
                </div>
                <ul className="space-y-3">
                  {officeHours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-3 last:pb-0"
                    >
                      <span className="font-medium text-brand-text">
                        {row.day}
                      </span>
                      <span
                        className={`font-semibold ${
                          row.hours === "Closed"
                            ? "text-brand-muted"
                            : "text-brand-teal"
                        }`}
                      >
                        {row.hours}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-brand-muted text-xs mt-4 leading-relaxed">
                  Emergency project inquiries available 24/7 via email.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map / Visual Band */}
      <section
        className="relative overflow-hidden"
        data-ocid="contact.map_section"
      >
        {/* Background image strip */}
        <div
          className="h-64 md:h-80 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('/assets/generated/contact-hero.dim_1400x600.jpg')",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-slate/75" />
          {/* Teal accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-teal" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center px-4"
            >
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-3">
                Proudly Serving the West Coast
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                Serving Your Area Since 2009
              </h2>
              <p className="text-white/60 text-base max-w-lg mx-auto">
                Operations across California, Nevada, and Washington State —
                with boots on the ground near you.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {["San Francisco", "Los Angeles", "Las Vegas", "Seattle"].map(
                  (city, i) => (
                    <span
                      key={city}
                      className="text-white/80 text-sm font-medium border border-white/20 rounded-full px-4 py-1.5"
                      data-ocid={`contact.city_badge.${i + 1}`}
                    >
                      {city}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Hours Strip */}
      <section className="bg-brand-teal py-5" data-ocid="contact.hours_strip">
        <div className="container-max px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {officeHours.map((row) => (
              <div
                key={row.day}
                className="flex items-center gap-2.5 text-white"
              >
                <Clock size={15} className="text-white/70 shrink-0" />
                <span className="text-sm font-semibold">{row.day}:</span>
                <span className="text-sm text-white/80">{row.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="bg-brand-slate section-padding"
        data-ocid="contact.cta_section"
      >
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not ready to send a message yet?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Explore our completed projects or learn more about what makes
              Buildify the most trusted name on the West Coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                data-ocid="contact.view_projects_button"
              >
                View Our Projects
              </Link>
              <Link
                to="/about"
                className="border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors"
                data-ocid="contact.about_button"
              >
                About Buildify
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
