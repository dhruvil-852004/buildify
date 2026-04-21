import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface Slide {
  id: number;
  eyebrow: string;
  headingParts: { text: string; highlight: boolean }[];
  subtext: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: "Premier Construction & Development",
    headingParts: [
      { text: "Building Tomorrow's\n", highlight: false },
      { text: "Foundations", highlight: true },
      { text: " Today", highlight: false },
    ],
    subtext:
      "Expert site preparation and regrading for residential and commercial projects. We shape the land so your vision can rise with confidence.",
    primaryCta: { label: "View Our Projects", href: "#projects" },
    secondaryCta: { label: "Request A Consultation", href: "#contact" },
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    eyebrow: "Land Grading & Drainage Solutions",
    headingParts: [
      { text: "Expert Grading &\n", highlight: false },
      { text: "Drainage", highlight: true },
      { text: " Systems", highlight: false },
    ],
    subtext:
      "Precision land grading and drainage engineering to protect your property, prevent erosion, and ensure long-term structural integrity.",
    primaryCta: { label: "Our Services", href: "#services" },
    secondaryCta: { label: "Get a Free Quote", href: "#contact" },
    image:
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    eyebrow: "Your Vision, Precisely Executed",
    headingParts: [
      { text: "Quality ", highlight: false },
      { text: "Construction\n", highlight: true },
      { text: "On Time & On Budget", highlight: false },
    ],
    subtext:
      "From foundation to finish, Buildify delivers unmatched craftsmanship across residential and commercial developments throughout Maharashtra and Gujarat.",
    primaryCta: { label: "Partner With Us", href: "/partner" },
    secondaryCta: { label: "Meet the Team", href: "/team" },
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80",
  },
];

const stats = [
  { value: "250+", label: "Projects Completed" },
  { value: "18+", label: "Years of Experience" },
  { value: "120+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="home"
      className="relative min-h-[500px] sm:min-h-[600px] md:min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero slideshow"
    >
      {/* ── Embla viewport (background images only) ── */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              aria-hidden="true"
              className="relative min-w-full h-full shrink-0"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Content overlay — vertically centered, LEFT-aligned ── */}
      <div className="relative z-10 flex-1 flex items-center pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12">
        <div className="container-max w-full px-5 sm:px-8 md:px-10">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, i) =>
                i === current && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
                  >
                    {/* Eyebrow */}
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="text-brand-teal text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 sm:mb-4"
                    >
                      {slide.eyebrow}
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.55 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-4 sm:mb-5 whitespace-pre-line"
                    >
                      {slide.headingParts.map((part) =>
                        part.highlight ? (
                          <span
                            key={part.text}
                            style={{ color: "oklch(0.536 0.098 196.3)" }}
                          >
                            {part.text}
                          </span>
                        ) : (
                          <span key={part.text}>{part.text}</span>
                        ),
                      )}
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32, duration: 0.5 }}
                      className="text-white/80 text-sm sm:text-base md:text-lg mb-7 sm:mb-9 leading-relaxed"
                    >
                      {slide.subtext}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.44, duration: 0.5 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                      <a
                        href={slide.primaryCta.href}
                        className="w-full sm:w-auto text-center bg-brand-teal text-white font-semibold uppercase tracking-wide px-7 sm:px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm min-h-[44px] flex items-center justify-center"
                        data-ocid={`hero.primary_button.${i + 1}`}
                      >
                        {slide.primaryCta.label}
                      </a>
                      <a
                        href={slide.secondaryCta.href}
                        className="w-full sm:w-auto text-center bg-brand-tan text-white font-semibold uppercase tracking-wide px-7 sm:px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm min-h-[44px] flex items-center justify-center"
                        data-ocid={`hero.secondary_button.${i + 1}`}
                      >
                        {slide.secondaryCta.label}
                      </a>
                    </motion.div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Prev arrow ── */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        data-ocid="hero.pagination_prev"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Next arrow ── */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        data-ocid="hero.pagination_next"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Stats bar — pinned to bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10"
        style={{ background: "oklch(0.318 0.042 213.5 / 0.92)" }}
      >
        <div className="container-max px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-ocid={`hero.stat.${i + 1}`}
                className={`text-center py-4 sm:py-5 px-3 sm:px-4 ${
                  i < stats.length - 1 ? "border-r border-white/10" : ""
                } ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""}`}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide mt-0.5 sm:mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
