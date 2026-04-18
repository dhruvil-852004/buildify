import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const hashLinks = [{ label: "Home", href: "#home" }];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";
  const isServices = pathname === "/services";
  const isPartner = pathname === "/partner";
  const isTeam = pathname === "/team";
  const isPortfolio = pathname === "/portfolio";
  const isSubPage = pathname !== "/";

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="relative container-max px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-teal rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-base sm:text-lg leading-none">
                B
              </span>
            </div>
            <span className="text-brand-text font-black text-lg sm:text-xl tracking-tight uppercase truncate">
              Buildify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7"
            aria-label="Main navigation"
          >
            {hashLinks.map((link) => {
              const isHomeActive = link.label === "Home" && pathname === "/";
              return (
                <a
                  key={link.label}
                  href={isSubPage ? `/${link.href}` : link.href}
                  className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                    isHomeActive
                      ? "text-brand-teal font-semibold border-brand-teal"
                      : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              to="/services"
              className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                isServices
                  ? "text-brand-teal font-semibold border-brand-teal"
                  : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
              }`}
              data-ocid="nav.services_link"
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                isPortfolio
                  ? "text-brand-teal font-semibold border-brand-teal"
                  : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
              }`}
              data-ocid="nav.project_link"
            >
              Project
            </Link>
            <Link
              to="/team"
              className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                isTeam
                  ? "text-brand-teal font-semibold border-brand-teal"
                  : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
              }`}
              data-ocid="nav.team_link"
            >
              Team
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                isAbout
                  ? "text-brand-teal font-semibold border-brand-teal"
                  : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
              }`}
              data-ocid="nav.about_link"
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                isContact
                  ? "text-brand-teal font-semibold border-brand-teal"
                  : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
              }`}
              data-ocid="nav.contact_link"
            >
              Contact
            </Link>
            <Link
              to="/partner"
              className={`text-sm font-medium transition-all whitespace-nowrap pb-0.5 border-b-2 ${
                isPartner
                  ? "text-brand-teal font-semibold border-brand-teal"
                  : "text-brand-muted border-transparent hover:text-brand-teal hover:border-brand-teal"
              }`}
              data-ocid="nav.partner_link"
            >
              Partner With Us
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <motion.a
              href={isSubPage ? "/#contact" : "#contact"}
              className="bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-5 xl:px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              data-ocid="nav.primary_button"
            >
              Request A Quote
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-1.5 text-brand-text rounded-md hover:bg-brand-bg-light transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="relative lg:hidden bg-white border-t border-border shadow-lg overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-3 flex flex-col">
              {hashLinks.map((link) => {
                const isHomeActive = link.label === "Home" && pathname === "/";
                return (
                  <a
                    key={link.label}
                    href={isSubPage ? `/${link.href}` : link.href}
                    className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                      isHomeActive
                        ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                        : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                    }`}
                    onClick={() => handleHashClick(link.href)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                );
              })}
              <Link
                to="/services"
                className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                  isServices
                    ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                    : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.services_link"
              >
                Services
              </Link>
              <Link
                to="/portfolio"
                className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                  isPortfolio
                    ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                    : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.project_link"
              >
                Project
              </Link>
              <Link
                to="/team"
                className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                  isTeam
                    ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                    : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.team_link"
              >
                Team
              </Link>
              <Link
                to="/about"
                className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                  isAbout
                    ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                    : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.about_link"
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                  isContact
                    ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                    : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.contact_link"
              >
                Contact
              </Link>
              <Link
                to="/partner"
                className={`flex items-center min-h-[44px] text-sm font-medium py-2.5 border-b border-border/40 transition-all border-l-4 ${
                  isPartner
                    ? "text-brand-teal font-semibold border-l-brand-teal pl-2"
                    : "text-brand-muted border-l-transparent pl-2 hover:text-brand-teal hover:border-l-brand-teal"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.partner_link"
              >
                Partner With Us
              </Link>
              <div className="pt-3 pb-2">
                <motion.button
                  type="button"
                  onClick={handleMobileQuote}
                  className="w-full bg-brand-teal text-white text-sm font-semibold uppercase tracking-wide px-6 py-3.5 rounded-full text-center hover:opacity-90 transition-opacity min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  data-ocid="nav.primary_button"
                >
                  Request A Quote
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
