import { Mail, MapPin, Phone } from "lucide-react";
import { Linkedin as SiLinkedin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const socialLinks = [
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiX, href: "#", label: "X" },
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
];

const quickLinks = ["Home", "Services", "Projects", "Team", "About Us"];

const services = [
  "General Contracting",
  "Project Management",
  "Residential Build",
  "Commercial Development",
  "Renovation",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  return (
    <footer id="contact" className="bg-brand-slate text-white">
      <div className="container-max px-4 sm:px-6 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-teal rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-lg leading-none">
                  B
                </span>
              </div>
              <span className="text-white font-black text-xl tracking-tight uppercase">
                Buildify
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Building exceptional structures since 2005. Your trusted partner
              for residential and commercial construction projects.
            </p>
            {/* Social icons — min 44x44px tap target */}
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-teal hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-4 sm:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-white/60 text-sm hover:text-brand-teal transition-colors inline-block min-h-[28px] leading-7"
                    data-ocid="footer.link"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-4 sm:mb-5">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-white/60 text-sm hover:text-brand-teal transition-colors inline-block min-h-[28px] leading-7"
                    data-ocid="footer.link"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-4 sm:mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-teal" />
                <span>
                  123 Construction Ave, Suite 500
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
              <li>
                <a
                  href="tel:+14155550192"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-brand-teal transition-colors min-h-[44px]"
                >
                  <Phone size={15} className="shrink-0 text-brand-teal" />
                  +1 (415) 555-0192
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@buildify.com"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-brand-teal transition-colors min-h-[44px]"
                >
                  <Mail size={15} className="shrink-0 text-brand-teal" />
                  hello@buildify.com
                </a>
              </li>
            </ul>
            <div className="mt-5 sm:mt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-brand-teal text-white text-xs font-semibold uppercase tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity min-h-[44px]"
                data-ocid="footer.primary_button"
              >
                Get A Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
          <p className="text-white/40 text-xs">
            &copy; {year} Buildify. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
