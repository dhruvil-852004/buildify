import { Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// Office coordinates — Nariman Point, Mumbai
const OSM_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=72.7742%2C18.8756%2C72.8742%2C18.9756&layer=mapnik&marker=18.9256%2C72.8242";
const OSM_DIRECTIONS_URL =
  "https://www.openstreetmap.org/?mlat=18.9256&mlon=72.8242#map=15/18.9256/72.8242";

const contactCards = [
  {
    icon: MapPin,
    label: "Our Office",
    value: "Nariman Point, Mumbai",
    sub: "Maharashtra 400021, India",
    accent: "bg-brand-teal",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 22 4800 2200",
    sub: "Mon–Sat, 9am – 7pm IST",
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
  { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
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

const serviceCities = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Surat", state: "Gujarat" },
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
    <div className="pt-16 md:pt-20 overflow-x-hidden" data-ocid="contact.page">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] flex items-center"
        data-ocid="contact.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/contact-hero.dim_1400x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-brand-slate opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.536 0.098 196.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.536 0.098 196.3) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-left"
          >
            <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Let's Connect
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 sm:mb-6">
              Let's Build <span className="text-brand-teal">Something</span>{" "}
              Great
            </h1>
            <p className="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed max-w-xl">
              Whether you have a question, need a free quote, or are ready to
              kick off your next major project — our team is here and ready to
              make it happen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-2 mt-8 sm:mt-10 text-white/50 text-sm"
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
        className="bg-brand-bg py-12 sm:py-16 lg:py-20"
        data-ocid="contact.info_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-border shadow-card hover:shadow-card-hover transition-shadow group"
                data-ocid={`contact.info_card.${i + 1}`}
              >
                <div
                  className={`w-12 h-12 ${card.accent} rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform`}
                >
                  <card.icon size={22} className="text-white" />
                </div>
                <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-2">
                  {card.label}
                </p>
                <p className="text-brand-text font-bold text-base sm:text-lg leading-snug mb-1">
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
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "oklch(0.94 0.005 220)" }}
        data-ocid="contact.form_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-border shadow-card"
            >
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
                Send A Message
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-text mb-6 sm:mb-8">
                Tell Us About Your Project
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-12 sm:py-16 gap-5"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">
                    Message Sent!
                  </h3>
                  <p className="text-brand-muted text-center max-w-sm text-sm sm:text-base">
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
                        placeholder="Rahul Sharma"
                        className="w-full border border-border rounded-lg px-4 py-3 text-base text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
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
                        placeholder="rahul@buildify.com"
                        className="w-full border border-border rounded-lg px-4 py-3 text-base text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
                        data-ocid="contact.email_input"
                      />
                    </div>
                  </div>

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
                        placeholder="+91 98765 43210"
                        className="w-full border border-border rounded-lg px-4 py-3 text-base text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
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
                        className="w-full border border-border rounded-lg px-4 py-3 text-base text-brand-text bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all appearance-none cursor-pointer"
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
                      className="w-full border border-border rounded-lg px-4 py-3 text-base text-brand-text bg-brand-bg placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all resize-none"
                      data-ocid="contact.description_textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 min-h-[44px]"
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
              className="lg:col-span-2 flex flex-col gap-5 sm:gap-6"
            >
              <div className="bg-brand-slate rounded-2xl p-6 sm:p-7 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-teal/20 rounded-lg flex items-center justify-center">
                    <Building2 size={20} className="text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">
                    Why Choose Buildify?
                  </h3>
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

              <div
                className="bg-white rounded-2xl p-6 sm:p-7 border border-border shadow-card"
                data-ocid="contact.hours_card"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-brand-text">
                    Office Hours
                  </h3>
                </div>
                <ul className="space-y-3">
                  {officeHours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-center justify-between gap-2 text-sm border-b border-border last:border-0 pb-3 last:pb-0"
                    >
                      <span className="font-medium text-brand-text">
                        {row.day}
                      </span>
                      <span
                        className={`font-semibold text-right ${
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

      {/* Find Our Office — Live Location Map Section */}
      <section
        className="bg-brand-slate py-12 sm:py-16 lg:py-20 overflow-hidden"
        data-ocid="contact.map_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-2">
              Our Location
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              Find Our <span className="text-brand-orange">Office</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-stretch">
            {/* Map panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              data-ocid="contact.map_panel"
            >
              {/* Responsive iframe wrapper using aspect-ratio */}
              <div className="relative w-full aspect-video sm:aspect-[16/7] lg:aspect-auto lg:h-[420px]">
                <iframe
                  src={OSM_EMBED_URL}
                  title="Buildify office location — Nariman Point, Mumbai"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-ocid="contact.map_iframe"
                />
              </div>

              {/* Address chip at bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-brand-slate/90 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-3 flex items-center gap-3 border border-white/10">
                  <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <Building2 size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight truncate">
                      Nariman Point, Mumbai
                    </p>
                    <p className="text-white/60 text-xs">
                      Maharashtra 400021, India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="lg:col-span-2 flex flex-col gap-5 sm:gap-6"
            >
              {/* Address + directions card */}
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
                data-ocid="contact.address_card"
              >
                <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-brand-orange" />
                  Headquarters
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-orange/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={15} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                        Address
                      </p>
                      <p className="text-white font-semibold text-sm leading-snug">
                        Nariman Point, Mumbai
                      </p>
                      <p className="text-white/70 text-sm">
                        Maharashtra 400021, India
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-teal/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={15} className="text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                        Phone
                      </p>
                      <p className="text-white font-semibold text-sm">
                        +91 22 4800 2200
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-teal/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={15} className="text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                        Email
                      </p>
                      <p className="text-white font-semibold text-sm break-all">
                        hello@buildify.com
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Get Directions button */}
                <a
                  href={OSM_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2.5 bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:opacity-90 active:scale-[0.98] transition-all w-full min-h-[44px]"
                  data-ocid="contact.get_directions_button"
                >
                  <Navigation size={16} />
                  Get Directions
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              </div>

              {/* Proudly Serving — Indian cities */}
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
                data-ocid="contact.service_areas_card"
              >
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 sm:mb-4">
                  Proudly Serving
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-4">
                  Operations across Maharashtra &amp; Gujarat — with dedicated
                  teams on the ground near you.
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {serviceCities.map(({ city, state }, i) => (
                    <div
                      key={city}
                      className="flex items-center gap-2 bg-white/5 hover:bg-brand-orange/10 border border-white/10 hover:border-brand-orange/30 rounded-lg px-2.5 sm:px-3 py-2 transition-colors"
                      data-ocid={`contact.city_badge.${i + 1}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                      <div className="min-w-0">
                        <p className="text-white text-xs font-semibold leading-tight truncate">
                          {city}
                        </p>
                        <p className="text-white/40 text-xs">{state}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Hours Strip */}
      <section
        className="bg-brand-teal py-4 sm:py-5"
        data-ocid="contact.hours_strip"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-12">
            {officeHours.map((row) => (
              <div key={row.day} className="flex items-center gap-2 text-white">
                <Clock size={14} className="text-white/70 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">
                  {row.day}:
                </span>
                <span className="text-xs sm:text-sm text-white/80">
                  {row.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="bg-brand-slate py-12 sm:py-16 lg:py-20"
        data-ocid="contact.cta_section"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Not ready to send a message yet?
            </h2>
            <p className="text-white/60 text-sm sm:text-base md:text-lg mb-7 sm:mb-8">
              Explore our completed projects or learn more about what makes
              Buildify the most trusted name across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity min-h-[44px] w-full sm:w-auto"
                data-ocid="contact.view_projects_button"
              >
                View Our Projects
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-white/30 text-white text-sm font-semibold uppercase tracking-wide px-7 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors min-h-[44px] w-full sm:w-auto"
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
