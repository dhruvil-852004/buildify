import { Leaf, Shield, Sparkles, Wind } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  { icon: Sparkles, label: "Timeless Elegance" },
  { icon: Leaf, label: "Eco-Friendly" },
  { icon: Shield, label: "Durable" },
  { icon: Wind, label: "Healthier Air" },
];

const products = [
  {
    name: "Lime Plaster",
    tagline: "Old-world craftsmanship, enduring beauty",
    description:
      "A breathable, mineral-based coating with a naturally matte finish. Lime plaster regulates humidity, resists mould, and acquires character with age — the hallmark of authentic artisan interiors.",
    image: "/assets/generated/rigve-lime-plaster.dim_600x400.jpg",
    accent: "bg-amber-50",
    tags: ["Timeless Elegance", "Healthier Air", "Eco-Friendly"],
  },
  {
    name: "Lime Wash",
    tagline: "Translucent layers, living colour",
    description:
      "Thin translucent coats that build depth and movement on any surface. Each application creates a unique, organic finish that evolves with light — bringing walls to life with subtle, undulating tone.",
    image: "/assets/generated/rigve-lime-wash.dim_600x400.jpg",
    accent: "bg-teal-50",
    tags: ["Timeless Elegance", "Eco-Friendly", "Durable"],
  },
  {
    name: "Concrete Texture",
    tagline: "Industrial strength, refined style",
    description:
      "Achieves the sophisticated look of raw polished concrete without structural compromise. Lightweight, highly durable, and UV-stable — ideal for modern residential and commercial interiors.",
    image: "/assets/generated/rigve-concrete-texture.dim_600x400.jpg",
    accent: "bg-slate-50",
    tags: ["Durable", "Eco-Friendly", "Timeless Elegance"],
  },
];

const tagColorMap: Record<string, string> = {
  "Timeless Elegance": "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
  "Eco-Friendly": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Durable: "bg-amber-50 text-amber-700 border-amber-200",
  "Healthier Air": "bg-sky-50 text-sky-700 border-sky-200",
};

export default function Products() {
  return (
    <section
      id="products"
      className="section-padding"
      style={{ background: "oklch(0.975 0.004 62)" }}
    >
      <div className="container-max">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
            RIGVE PREMIUM TEXTURE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
            Premium Texture Products
          </h2>
          <div className="w-12 h-1 bg-brand-teal mx-auto mt-4 rounded-full" />
          <p className="text-brand-muted text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Surfaces that breathe, endure, and inspire. Every RIGVE finish
            combines natural materials with refined craftsmanship for interiors
            you'll love for decades.
          </p>
        </div>

        {/* Benefit Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
          data-ocid="products.benefits"
        >
          {benefits.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/30 bg-white text-brand-text text-sm font-medium shadow-sm"
            >
              <Icon className="w-4 h-4 text-brand-teal" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
              data-ocid={`products.card.${i + 1}`}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-white font-bold text-xl drop-shadow-sm">
                  {product.name}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-brand-teal text-xs font-semibold uppercase tracking-wider mb-2">
                  {product.tagline}
                </p>
                <p className="text-brand-muted text-sm leading-relaxed mb-5 flex-1">
                  {product.description}
                </p>

                {/* Benefit Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColorMap[tag] ?? "bg-muted text-foreground border-border"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 rounded-2xl overflow-hidden relative"
          data-ocid="products.banner"
        >
          <img
            src="/assets/generated/rigve-texture-hero.dim_800x500.jpg"
            alt="RIGVE Premium Texture wall finish"
            className="w-full h-56 md:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-slate/80 via-brand-slate/50 to-transparent flex items-center">
            <div className="px-8 md:px-14 max-w-lg">
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-2">
                Crafted to Last
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-snug">
                Where Nature Meets Craft
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                RIGVE textures are formulated with natural lime and mineral
                pigments — zero harmful VOCs, zero compromise on beauty.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
