import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const hashLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";
  const isServices = pathname === "/services";
  const isSubPage = pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileQuote = () => {
    setMobileOpen(false);
    if (isSubPage) {
      window.location.href = "/#contact";
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHashClick = (href: string) => {
    setMobileOpen(false);
    if (isSubPage) {
      window.location.href = `/${href}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container-max px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 bg-brand-teal rounded flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">
                B
              </span>
            </div>
            <span className="text-brand-text font-black text-xl tracking-tight uppercase">
              Buildify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {hashLinks.map((link) => (
              <a
                key={link.label}
                href={isSubPage ? `/${link.href}` : link.href}
                className="text-sm font-medium text-brand-muted hover:text-brand-teal transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                isServices
                  ? "text-brand-teal font-semibold"
                  : "text-brand-muted hover:text-brand-teal"
              }`}
              data-ocid="nav.services_link"
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isAbout
                  ? "text-brand-teal font-semibold"
                  : "text-brand-muted hover:text-brand-teal"
              }`}
              data-ocid="nav.about_link"
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isContact
                  ? "text-brand-teal font-semibold"
                  : "text-brand-muted hover:text-brand-teal"
              }`}
              data-ocid="nav.contact_link"
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href={isSubPage ? "/#contact" : "#contact"}
              className="bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              data-ocid="nav.primary_button"
            >
              Request A Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-brand-text"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {hashLinks.map((link) => (
                <a
                  key={link.label}
                  href={isSubPage ? `/${link.href}` : link.href}
                  className="text-sm font-medium text-brand-muted hover:text-brand-teal py-2 transition-colors"
                  onClick={() => handleHashClick(link.href)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/services"
                className={`text-sm font-medium py-2 transition-colors ${
                  isServices
                    ? "text-brand-teal font-semibold"
                    : "text-brand-muted hover:text-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.services_link"
              >
                Services
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium py-2 transition-colors ${
                  isAbout
                    ? "text-brand-teal font-semibold"
                    : "text-brand-muted hover:text-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.about_link"
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium py-2 transition-colors ${
                  isContact
                    ? "text-brand-teal font-semibold"
                    : "text-brand-muted hover:text-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.contact_link"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={handleMobileQuote}
                className="bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-6 py-2.5 rounded-full text-center mt-2"
                data-ocid="nav.primary_button"
              >
                Request A Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
