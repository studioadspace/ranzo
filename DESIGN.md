# Ranzospace — Design System & Implementation Bible

> This file is the source of truth for every visual and code decision across the site.
> Read this before touching any component. No exceptions.

---

## 1. Design DNA

Ranzospace is not a portfolio site. It is a **statement of conviction**. Every decision — spacing, colour, type, motion — communicates the same thing: we are meticulous, unhurried, and we do not cut corners.

Reference studios: Pentagram, Dinamo, Bureau Borsche, Lusion.

**The three rules that govern every decision:**
1. **Minimum.** If it doesn't carry weight, it doesn't exist.
2. **Type is the primary design tool.** Hierarchy replaces decoration.
3. **Motion reveals. It does not perform.** Every animation has a reason.

---

## 2. Colour Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0e0e0c` | Page background — every section |
| `--text` | `#fefefe` | Primary headings, bold body |
| `--text-secondary` | `#c8c4bc` | Supporting body copy, labels |
| `--accent` | `#F8931E` | CTAs, counter numbers, eyebrow accents |
| `--border` | `rgba(255,255,255,0.06)` | Dividers only — never on text |

**Locked rule:** No `rgba` with alpha < 1 on any rendered text element. Use `#fefefe` or `#c8c4bc`. Not `rgba(240,236,228,0.75)`. That was a bug we fixed and must never return.

---

## 3. Typography

### Fonts
- **Display / Headlines:** Plus Jakarta Sans, `fontWeight: 800`, `letterSpacing: "-0.03em"`
- **Body:** Plus Jakarta Sans, `fontWeight: 300`, `lineHeight: 1.75–1.85`
- **Eyebrow labels:** Instrument Serif, `fontWeight: 600`, `letterSpacing: "0.18em"`, `textTransform: "uppercase"`, `fontSize: "11px"`
- **Italic accent:** Instrument Serif, `fontWeight: 300`, `fontStyle: "italic"`

### Scale (fluid via `clamp()`)
| Role | Desktop | Mobile |
|---|---|---|
| Hero H1 | `clamp(46px, 4.8vw, 76px)` | `clamp(44px, 11vw, 64px)` |
| Section H2 | `clamp(34px, 3.2vw, 56px)` | `clamp(28px, 9vw, 40px)` |
| Sub-heading H2 | `clamp(28px, 2.6vw, 44px)` | `clamp(28px, 8vw, 40px)` |
| Body large | `clamp(17px, 1.1vw, 19px)` | `15px` |
| Body standard | `clamp(14px, 1.05vw, 16px)` | `14–15px` |
| Caption / label | `13px` | `10–12px` |

### Banned copy rules
- No em-dashes (—) or en-dashes (–) anywhere in copy
- Replace with a period, comma, or restructure the sentence

---

## 4. Layout

### Containers
- Max width: `1440px`, centred
- Desktop padding: `clamp(16px, 5vw, 48px)` horizontal
- Mobile padding: `20px` horizontal (never `16px` on elements with breathing content)

### Grid
- Desktop default: 2-col or 3-col CSS Grid
- Mobile: always single-column unless reference explicitly shows 2-col (e.g. stats, portfolio grid)

### Spacing Scale (mobile-first)
| Gap between sections | Mobile | Desktop |
|---|---|---|
| Section bottom padding | `48px` | `88px` |
| Stats/About section | `20px` bottom | `60px` |
| Divider margin | `20px` | `60px` |
| Within-section gap | `24–32px` | `40–60px` |

---

## 5. Responsive Rules

### Breakpoint
- `768px` — use `useBreakpoint(768)` hook at `web/hooks/useBreakpoint.ts`
- Returns `isMobile: boolean`
- All layout branching is done in JS via inline styles, not Tailwind classes

### Mobile-specific locked decisions (agreed in session, do not reverse)
1. **SINCE 2018 block** in hero: `alignItems: "flex-end"` — sits at bottom-right of the text row
2. **TheCraftSection images:** Use `opacity+y` animation (`whileInView`), not `clipPath` — clipPath is unreliable with IntersectionObserver on mobile
3. **TheCraftSection heading/text:** All use `whileInView` directly — no `useInView` ref placed downstream of the element being animated
4. **RecentWorksSection heading:** Left-aligned on mobile (`textAlign: "left"`)
5. **RecentWorksSection images:** No text labels on mobile — clean images, all `4/3` aspect ratio for balanced 2×2 grid
6. **Footer mobile:** Fully centred single-column — large logo centred, CTA centred, nav label "Contact" (not "Navigate"), nav links centred at `18px`, contact info centred, bottom bar remains row
7. **CustomCursor:** Uses `pointer: coarse` media query (not viewport width) to detect touch devices — never renders on touch devices, always renders on fine-pointer desktop

### Never break desktop while fixing mobile
- All desktop layout values are preserved via `isMobile ? mobileValue : desktopValue`
- Desktop padding variables: `PAD = "clamp(16px, 5vw, 48px)"`, `MAX_W = "1440px"`

---

## 6. Animation System

### Principles
- Scroll-triggered animations via Framer Motion `whileInView` (preferred) or `useInView` + `animate`
- `viewport={{ once: true, margin: "0px" }}` for mobile
- `viewport={{ once: true, margin: "-60px" }}` for desktop
- Duration range: `0.55s – 0.95s`
- Easing: `[0.22, 1, 0.36, 1]` (ease-out spring) for reveals; `[0.76, 0, 0.24, 1]` for clipPath

### Standard entrance patterns
```tsx
// Fade + lift (most common)
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "0px" }}
transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}

// Clip-path reveal (desktop images only)
initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
viewport={{ once: true, margin: "-60px" }}
transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}

// Staggered children: add delay: index * 0.07–0.1
```

### Critical animation bugs to avoid
- **Never** place `ref` on an element that is BELOW the element being animated. The `useInView` fires based on the ref element entering viewport — if the ref is further down, the element above stays invisible forever.
- **Never** use `clipPath` animation on mobile — use `opacity + y` instead.
- **Always** prefer `whileInView` over manual `useInView` + `animate={inView ? ... : {}}`.

---

## 7. Images

### Source rules
- All project photos live in `/public/projects-photos/`
- Valid photos: `rishi-staging-01` through `rishi-staging-06`, `pramod-01` through `pramod-04`, `rishi-photo-01` through `rishi-photo-04`
- **Never repeat** the same image on a single page
- **Never use** kitchen photos labeled as bedrooms or random images labeled as commercial

### Photo inventory (actual room types — verified)
| File | Room type |
|---|---|
| `pramod-01.jpg` | Living room (white/beige sofa, marble accent wall) |
| `pramod-02.jpg` | Living room (corner sofa, open plan) |
| `pramod-03.jpg` | Duplicate/similar — avoid |
| `pramod-04.jpg` | Duplicate/similar — avoid |
| `rishi-staging-01.jpg` | Foyer / hallway (pendant lights, artwork) |
| `rishi-staging-02.jpg` | Dining room (table, bookshelf backdrop) |
| `rishi-staging-03.jpg` | Master bedroom (brown headboard, curtains) |
| `rishi-staging-04.jpg` | Bedroom with study (warm wood tones) |
| `rishi-staging-05.jpg` | Avoid (duplicate quality) |
| `rishi-staging-06.jpg` | Avoid (duplicate quality) |
| `rishi-photo-01.jpg` | Living space |
| `rishi-photo-02.jpg` | Bar unit / display shelf |
| `rishi-photo-03.jpg` | Detail shot |
| `rishi-photo-04.jpg` | Custom wardrobe / joinery |

### Usage for next/image
```tsx
<Image src="/projects-photos/rishi-staging-02.jpg" alt="Dining room - Mumbai" fill
  style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
```

---

## 8. Component Conventions

### Code style (locked)
- **All layout via inline styles** — no Tailwind utility classes for spacing or layout
- Responsive branching: `isMobile ? mobileValue : desktopValue`
- `next/image` with `fill` + `objectFit: cover` for all project photos
- `"use client"` at top of every component file
- Metadata exports only in `layout.tsx`, never in `page.tsx` (those are "use client")

### Shared constants (copy into every component file)
```tsx
const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";
```

---

## 9. Page-by-Page Unification Checklist

Every page must comply with all of the above. Check each item before considering a page done:

### Visual
- [ ] Background: `#0e0e0c` on every section
- [ ] All text: `#fefefe` (primary) or `#c8c4bc` (secondary) — no `rgba` on text
- [ ] Accent: `#F8931E` on counters, CTAs, eyebrows only
- [ ] No em-dashes or en-dashes in copy

### Layout
- [ ] Desktop: `MAX_W = 1440px`, `PAD = clamp(16px, 5vw, 48px)`
- [ ] Mobile: single-column, `20px` side padding
- [ ] Section bottom padding: `48px` mobile / `88px` desktop
- [ ] Hero has `paddingTop` accounting for fixed navbar (~`100px` mobile, `clamp(80px, 12vw, 120px)` desktop)

### Responsive
- [ ] `useBreakpoint(768)` used for all layout branching
- [ ] Desktop layout untouched when mobile is adjusted
- [ ] No `rgba` text opacity hacks

### Animation
- [ ] All scroll-triggered elements use `whileInView` or `useInView` with ref on the SAME element being animated
- [ ] Mobile images use `opacity+y`, not `clipPath`
- [ ] `once: true` on all viewports
- [ ] No animation makes text invisible permanently (check `initial` state)

### Navigation & Global
- [ ] `<Navbar />` at top of every page
- [ ] `<CustomCursor />` at top of every page
- [ ] `<FooterSection />` at bottom of every page
- [ ] Footer mobile: centred layout (see Section 5)

---

## 10. Pages Status

| Page | Route | Status |
|---|---|---|
| Homepage | `/` | DONE — reference implementation |
| About | `/about` | Needs audit |
| Work | `/work` | Needs audit |
| Services | `/services` | Needs audit |
| Services > Interior Design | `/services/interior-design` | Needs audit |
| Services > Architecture | `/services/architecture` | Needs audit |
| Services > Furniture | `/services/furniture` | Needs audit |
| Contact | `/contact` | Needs audit |

### What "Needs audit" means
- Replace any `rgba(x,x,x,<1)` on text with `#fefefe` or `#c8c4bc`
- Add `useBreakpoint(768)` and implement mobile layout
- Replace any fixed `PAD = "48px"` with `clamp(16px, 5vw, 48px)` and mobile `20px`
- Ensure section padding matches scale above
- Switch any `useInView + animate` refs placed on wrong elements to `whileInView`
- Verify Navbar, CustomCursor, FooterSection are all included

---

## 11. Locked Commits (Homepage — Do Not Revert)

| Commit | What is locked |
|---|---|
| `084c487` | Full mobile overhaul + text opacity sweep (no rgba on text) |
| `bb52e23` | CustomCursor disabled on mobile via `pointer: coarse` |
| `ee862d7` | TheCraftSection: whileInView on all mobile elements; RecentWorks: always-visible labels removed, replaced with clean images |
| `75d0db4` | Mobile section spacing: Stats 32/20px, TheCraft 48px bottom, all others 48px |
| `3f171bc` | Hero SINCE 2018 bottom-right; Recent Works left-aligned + 4/3 ratio; Footer centred mobile |
| `9038ca0` | Desktop hero padding clamp(180px,12vw,120px) / clamp(120px,3vw,32px); cursor ring duration-100 |
