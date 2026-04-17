import { Mail, MapPin, Phone } from "lucide-react";
import { Linkedin as SiLinkedin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const socialLinks = [
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiX, href: "#", label: "X" },
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer id="contact" className="bg-brand-slate text-white">
      <div className="container-max px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-teal rounded flex items-center justify-center">
                <span className="text-white font-black text-lg leading-none">
                  B
                </span>
              </div>
              <span className="text-white font-black text-xl tracking-tight uppercase">
                Buildify
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Building exceptional structures since 2005. Your trusted partner
              for residential and commercial construction projects.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-teal hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Services", "Projects", "Team", "About Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "")}`}
                      className="text-white/60 text-sm hover:text-brand-teal transition-colors"
                      data-ocid="footer.link"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "General Contracting",
                "Project Management",
                "Residential Build",
                "Commercial Development",
                "Renovation",
              ].map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-white/60 text-sm hover:text-brand-teal transition-colors"
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
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-teal" />
                <span>
                  123 Construction Ave, Suite 500
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={15} className="shrink-0 text-brand-teal" />
                +1 (415) 555-0192
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={15} className="shrink-0 text-brand-teal" />
                hello@buildify.com
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block bg-brand-teal text-white text-xs font-semibold uppercase tracking-wide px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                data-ocid="footer.primary_button"
              >
                Get A Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {year} Buildify. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
