# Buildify Design Brief

**Tone:** Premium construction, editorial confidence, approachable professionalism. Bold but not garish.

## Palette (Light Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Teal) | 0.536 0.098 196.3 | Brand identity, headers, CTAs |
| Accent (Orange) | 0.661 0.196 38.6 | FAB, highlights, active states |
| Secondary (Tan) | 0.596 0.072 62.5 | CTA buttons, warm accents |
| Dark Slate | 0.318 0.042 213.5 | Headings, bold text |
| Background | 0.965 0.005 220 | Page base |
| Muted | 0.94 0.005 220 | Section alternation, subtle depth |
| Text | 0.239 0.023 213 | Body copy |

## Typography
| Tier | Font | Usage |
|------|------|-------|
| Display | Inter 700–900 | Page titles, section heads |
| Body | Inter 400–500 | Paragraphs, body text |
| UI | Inter 600 | Buttons, labels, cards |

## Structural Zones
- **Header/Nav:** Sticky, border-bottom. Logo + nav links. Services link redirects to `/services` page.
- **Hero (Services page):** `bg-brand-teal`, white text, centered copy. Section-padding.
- **Service Grid:** Light bg, card-based layout (2 cols mobile → 4 cols desktop). Hover states elevate cards.
- **Capabilities Strip:** Muted bg, numbered list or feature carousel. Optional animation on scroll.
- **Process/Timeline:** Light bg. Vertical timeline on mobile, horizontal on desktop.
- **CTA Section:** `bg-brand-orange` or `bg-brand-tan` with white text. Clear button.
- **Footer:** Border-top, muted bg, text left-aligned.

## Motion & Animation
- Service card hover: Lift + subtle shadow-elevated. No bounce.
- FAB pulse: Continuous gentle glow. 2s cycle.
- Section entrance: Fade-in on scroll (optional, Intersection Observer).
- Button hover: Text color shift to complement, background subtle lighten.

## Patterns
- All pages follow: Hero → Content Sections (alternating bg) → Footer.
- Service cards: Icon + title + short description. Hover reveals "Learn More" or "Get Quote" CTA.
- Contact CTAs use tan (#9A7A52) buttons; primary nav uses teal.
- Section padding: `py-20 px-4` for consistency.
- Max-width container: `max-w-6xl mx-auto`.

## Constraints
- No gradients (solid OKLCH colors only).
- No generic rounded corners (use intentional radius values: 0, 4px, 8px, 12px).
- No shadows beyond `shadow-card`, `shadow-card-hover` (defined in tailwind.config.js).
- Motion is restrained: ease-out cubic-bezier, 200–300ms duration.
- Accessibility: AA+ contrast on all text. No color-only indicators.
