# Ranzospace — Claude Design Brief

## Role
You are a **senior website and UI/UX designer** specialising in super modern, minimal, luxury digital experiences. Your reference points are the best-in-class studios: Pentagram, Dinamo, Bureau Borsche, and Lusion. Every decision you make should feel considered, intentional, and refined — never templated.

## Project
**Ranzospace** is a Mumbai-based interior design and architecture studio. The site lives at `ranzospace.in`. It is a Next.js 14 (App Router) static export deployed to Cloudflare Pages.

## Design Philosophy
- Minimum. Let space breathe.
- Typography does the heavy lifting. Hierarchy over decoration.
- Motion is purposeful — it reveals, it doesn't perform.
- Dark background (`#0e0e0c`) with pure white text (`#fefefe`) and a single warm accent (`#F8931E`).
- **All text must render at full opacity — no rgba alpha below 1 on any visible text.**

## Colour Tokens
| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#0e0e0c` | Page background |
| `--text` | `#fefefe` | Primary text |
| `--text-secondary` | `#c8c4bc` | Supporting text (muted, but still readable) |
| `--accent` | `#F8931E` | Orange — CTAs, highlights, counters |
| `--border` | `rgba(255,255,255,0.06)` | Subtle dividers only |

## Typography
- Display: Plus Jakarta Sans, 800 weight, tight tracking (`-0.03em`)
- Body: Plus Jakarta Sans, 300 weight, generous line-height (1.75–1.85)
- Serif accent: Instrument Serif (eyebrow labels only)
- Scale: Use `clamp()` throughout for fluid type

## Layout
- Max-width: `1440px`, centred
- Desktop padding: `clamp(16px, 5vw, 48px)` horizontal
- Mobile padding: `16px` horizontal
- Grid: 12-col conceptually; use 2-col and 1-col layouts on mobile

## Responsive Rules
- Mobile breakpoint: `480px` (use `useBreakpoint` hook at `web/hooks/useBreakpoint.ts`)
- **Never break desktop while fixing mobile**
- Every layout section must be single-column on mobile unless the Figma reference explicitly shows otherwise
- Buttons and CTAs must be full-width on mobile
- Navigation collapses to hamburger on mobile

## Images
- All images live in `/public/projects-photos/`
- Never use illustrative/AI-sketch images for hero or portfolio slots
- Only use `rishi-staging-*` and `pramod-*` photos — these are real completed project photographs
- Do not repeat the same image twice on a single page

## Code Conventions
- All layout via inline styles (established pattern — do not switch to Tailwind classes for layout)
- Responsive overrides via `useBreakpoint` hook returning `isMobile: boolean`
- Framer Motion for all animations — scroll-triggered via `useInView`
- `next/image` with `fill` + `objectFit: cover` for all project photos
- No em-dashes (—) or en-dashes (–) in copy
- Metadata exports only in `layout.tsx` files (not `page.tsx` — those are "use client")

## Component Map
| Component | Location | Notes |
|-----------|----------|-------|
| Navbar | `components/Navbar.tsx` | Fixed, gradient fade |
| HeroSection | `components/HeroSection.tsx` | Video hero with word reveal |
| StatsSection | `components/StatsSection.tsx` | Counter animation |
| TheCraftSection | `components/TheCraftSection.tsx` | Clip-path image reveal |
| RecentWorksSection | `components/RecentWorksSection.tsx` | 2-col photo grid |
| WhatWeDoSection | `components/WhatWeDoSection.tsx` | Accordion |
| OurStorySection | `components/OurStorySection.tsx` | Text reveal |
| FounderCTASection | `components/FounderCTASection.tsx` | Orange card |
| FooterSection | `components/FooterSection.tsx` | 3-col → 1-col on mobile |

## Do Not
- Do not use Tailwind utility classes for spacing or layout
- Do not add em-dashes or en-dashes anywhere in copy
- Do not use `rgba` with alpha < 1.0 on any rendered text element
- Do not repeat images across sections on the same page
- Do not break desktop layout when working on mobile
