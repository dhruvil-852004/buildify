# Buildify Design Brief

**Tone:** Premium construction, site expertise, earthy professionalism. Regrading-focused narrative emphasizing precision, heavy equipment mastery, and site transformation.

**Aesthetic:** Construction-themed with industrial earth palette, geometric accents, minimal flat design. Strong narrative around excavation, grading, and site preparation. Motion is purposeful, not ornamental.

## Palette (Light Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Teal) | 0.536 0.098 196.3 | Brand identity, headers, CTAs, hero bg |
| Accent (Orange) | 0.661 0.196 38.6 | FAB, highlights, active states |
| Secondary (Tan) | 0.596 0.072 62.5 | CTA buttons, warm accents, section dividers |
| Dark Slate | 0.318 0.042 213.5 | Headings, bold text, footers |
| Soil Brown | 0.48 0.08 60 | Regrading sections, earth accents, card borders |
| Equipment Yellow | 0.74 0.18 92 | Machinery highlights, badges, emphasis |
| Charcoal | 0.28 0.02 210 | Industrial text, deep headings |
| Sand Beige | 0.88 0.06 80 | Section backgrounds, subtle depth |
| Background | 0.965 0.005 220 | Page base |
| Muted | 0.94 0.005 220 | Section alternation, subtle depth |
| Text | 0.239 0.023 213 | Body copy |

## Typography
| Tier | Font | Usage |
|------|------|-------|
| Display | DM Sans 600–700 | Page titles, hero headlines, section heads |
| Body | Inter 400–500 | Paragraphs, body text, descriptions |
| Mono | Geist Mono 400 | Code, data, stats labels |

## Fonts
- **Display**: DM Sans (bold, geometric, construction-ready personality)
- **Body**: Inter (refined, accessible, readable at all sizes)
- **Mono**: Geist Mono (data, stats, technical labels)

## Structural Zones
| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header/Nav | `bg-white` | `border-b border-border` | Sticky, high contrast |
| Hero (About) | `bg-brand-teal` | None | Full-width, white text, 8-12rem tall, left-aligned |
| Hero Image Overlay | Excavator/site image | None | Background image with content overlay, 50% opacity dark gradient |
| Expertise Block | `bg-white` | None | 3-card grid, `border-earth-brown` left accent on cards |
| Project Before/After | `bg-earth-sand` | `border-4 border-earth-brown` | Grid showcase of regrading projects |
| Core Expertise | `bg-white` | None | 4-card grid, `shadow-card`, earth-brown accent badges |
| Stats Strip | `bg-earth-brown` | None | Animated numbers, white text, equipment-yellow accents |
| Team Section | `bg-muted` | None | Team profiles with earth-toned image borders |
| CTA Section | `bg-brand-slate` | None | White text, "Start Your Project" button, call-to-action |
| Footer | `bg-white` | `border-t border-border` | Logo, links, contact info |

## Motion & Animation
- **Hero entrance**: Fade-in on page load (200ms)
- **Stats**: Staggered number animation (count-up effect, 1s per stat)
- **Card hover**: Lift + shadow-card-hover, no scale. 200ms ease-out.
- **Team card**: Staggered slide-up on scroll (Intersection Observer)
- **Section transitions**: Fade-in on scroll, 300ms ease-out
- **FAB pulse**: 2s cycle, 0–12px box-shadow glow

## Patterns
- All pages: Hero → Content (alternating bg) → Footer
- About Us (regrading): Hero + image overlay → Expertise → Projects → Stats → Team → CTA
- Section padding: `py-20 px-4` for consistency
- Max-width container: `max-w-6xl mx-auto`
- Card base: `bg-white shadow-card rounded-lg p-6 md:p-8`
- Regrading accent: `border-l-4 border-earth-brown` on expertise/project cards
- Project cards: `border-4 border-earth-brown` with before/after image grid
- Badge style: `bg-earth-yellow text-earth-charcoal px-3 py-1 rounded text-sm font-semibold`
- CTA buttons: `bg-brand-tan text-white px-6 py-3 rounded-lg font-semibold`
- Image treatment: Full-width hero image with 50% dark gradient overlay for text readability
- No color-only indicators; text labels required

## Constraints
- No gradients (solid OKLCH colors only)
- No generic rounded corners (intentional radius: 0, 4px, 8px, 12px)
- No shadows beyond `shadow-card`, `shadow-card-hover`
- Motion: ease-out cubic-bezier, 200–300ms duration max
- Accessibility: AA+ contrast on all text, min 18px body, 24px heading
- Hero max-height: 60vh to prevent excessive scrolling on mobile
