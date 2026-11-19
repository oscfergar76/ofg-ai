---
name: Obsidian Cybernetic Academic
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#ffb2b7'
  on-secondary: '#67001b'
  secondary-container: '#b50036'
  on-secondary-container: '#ffc2c4'
  tertiary: '#f1f8ff'
  on-tertiary: '#00354a'
  tertiary-container: '#b2e1ff'
  on-tertiary-container: '#00678c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#92002a'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  headline-display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '800'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.625rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 1.875rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets high school (Bachillerato) and university students navigating intensive study cycles, lecture analysis, and exam preparation. The brand personality is hyper-focused, futuristic, and intellectually empowering—treating AI not as an abstract novelty, but as a high-precision intellectual copilot.

The aesthetic fuses **Modern Glassmorphism** with **Futuristic High-Tech Minimalism**:
- **Environment:** Deep pitch-slate voids that eliminate cognitive fatigue during late-night study sessions.
- **Atmosphere:** Controlled luminescent glows, electric cyan accents, and focused depth layers simulating a holographic workstation interface.
- **Tone & Copy:** Natural European Spanish ("Tus asignaturas", "Resumen de clase", "Modo Repaso", "Grabando...") combining academic precision with intuitive immediacy.
- **Emotional Impact:** Absolute clarity, zero visual clutter, and confidence under pressure.

## Colors

The palette establishes an ultra-dark canvas pierced by high-energy optical accents:

- **Base Obsidian Layers:** 
  - Canvas Root: `#07090e`
  - Elevated Container: `#090d16`
  - Floating Glass Surface: `rgba(15, 23, 42, 0.72)` with a 1px border perimeter tinted to `rgba(56, 189, 248, 0.15)`.
- **Primary Energy (Electric Cyan & Sky):** `#00f2fe` driving into `#38bdf8`. Reserved for interactive controls, dynamic progress metrics, active tab indicators, and AI synthesis highlights.
- **Secondary Energy (Neon Crimson Pulse):** `#f43f5e` shifting to `#fb7185`. Dedicated to active voice transcription states, microphone live capture, high-priority exam warnings, and critical error nodes.
- **Typography & Structural Neutrals:** Primary headlines in crystalline `#f8fafc`; body narratives, secondary metadata, and resting icons in muted reflective slate `#94a3b8`. Subtle structural separators use `rgba(148, 163, 184, 0.08)`.

## Typography

The typographic hierarchy pairs **Plus Jakarta Sans** for expressive, geometric headers and tactical labels with **Inter** for sustained technical legibility in dense academic notes.

- Display headers use tighter letter tracking (-0.02em to -0.03em) to yield a commanding, cybernetic presence.
- Body sizes lean on Inter's tall x-height and neutral geometry to maintain fatigue-free readability across multi-page lecture summaries and flashcard decks.
- Small uppercase metadata labels leverage wide letter spacing (+0.04em to +0.06em) and semi-bold weights for rapid scanning of tags, timestamps, and confidence scores.

## Layout & Spacing

The spatial architecture is built on a responsive 12-column fluid grid designed for multi-panel split views (e.g., lecture audio player synchronized with real-time markdown transcription and interactive flip-cards).

- **Desktop (>= 1280px):** 12 columns, `margin: 3rem`, `gutter: 1.5rem`. Accommodates side-by-side study modes (synthesized flashcards on the left, interactive AI chat on the right).
- **Tablet (768px - 1279px):** 8 columns, `margin: 1.5rem`, `gutter: 1.25rem`. Stacked primary tabs with persistent floating audio dock.
- **Mobile (< 768px):** 4 columns, `margin: 1rem`, `gutter: 1rem`. Full-width modular cards, collapsible bottom sheets for AI prompts, and fixed bottom audio dock.
- **Layout Rhythm:** Strict 4px/8px incremental base. Internal card padding strictly enforces `space-md` (mobile) to `space-lg` (desktop) to ensure breathing room between high-density technical study content.

## Elevation & Depth

Visual hierarchy uses a dark-glass layer system rather than traditional drop shadows:

- **Level 0 (Canvas):** Pure void `#07090e` with optional faint radial background glow (`radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.06), transparent 70%)`).
- **Level 1 (Structural Cards & Surfaces):** `rgba(15, 23, 42, 0.65)` layered over `backdrop-filter: blur(16px)` with a crisp outer edge: `border: 1px solid rgba(56, 189, 248, 0.12)`.
- **Level 2 (Hover & Active Contexts):** `rgba(15, 23, 42, 0.85)` with `border: 1px solid rgba(0, 242, 254, 0.35)` and an ambient diffuse glow: `box-shadow: 0 0 24px -4px rgba(0, 242, 254, 0.18)`.
- **Level 3 (Overlays, Floating Players, Modals):** `rgba(9, 13, 22, 0.92)` with `backdrop-filter: blur(24px)`, subtle inner top-highlight `inset 0 1px 0 rgba(255, 255, 255, 0.1)`, and `box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8)`.
- **Recording Pulse State:** Surfaces under active mic input cast a soft ambient red halo: `box-shadow: 0 0 32px 0 rgba(244, 63, 94, 0.22)`.

## Shapes

The interface embraces a futuristic pill-forward shape language (`roundedness: 3`):

- **Micro elements & Interactive Controls:** Complete pills (`9999px`) for action buttons, filter tags, voice-input pills, and status chips.
- **Cards & Data Modules:** Smooth curved corners (`rounded-xl` / `1.5rem` to `2rem`) producing an ergonomic, tactile viewport that softens the dark aesthetic.
- **Sub-containers & Media Panels:** `rounded-lg` (`1rem`) for embedded media players, waveform containers, and answer reveal sections.

## Components

### 1. Tactile Glowing Pill Buttons
- **Primary:** High-impact gradient fill (`linear-gradient(135deg, #00f2fe 0%, #38bdf8 100%)`) paired with deep obsidian text (`#07090e`, weight 700). Edge hover casts a localized electric glow: `box-shadow: 0 0 20px rgba(0, 242, 254, 0.45)`.
- **Secondary (Ghost Glass):** Transparent base, `border: 1px solid rgba(56, 189, 248, 0.25)`, text `#f8fafc`. Hover triggers `background: rgba(56, 189, 248, 0.08)` and border intensification.
- **Recording State:** Animated pulsing border cycling between `#f43f5e` and `#fb7185` with a subtle rhythmic scale transition (`scale(1.02)`).

### 2. Glassmorphic Cards & Flip Cards
- **Base Card:** Frosted obsidian glass (`rgba(15, 23, 42, 0.72)`), subtle 1px border glow. Hover triggers smooth border translation to primary cyan.
- **Study Flashcard (Flip Interaction):** Dual-faced 3D perspective flip container (`perspective: 1000px`).
  - *Front Face (Pregunta / Concepto):* Clean obsidian slate, centered high-contrast headline, difficulty pill tag at top-right.
  - *Back Face (Respuesta / Desarrollo IA):* Tinted subtle cyan glass finish (`rgba(0, 242, 254, 0.04)`), bulleted mnemonic takeaways, and bottom rating pills ("Repasar", "Dominado").

### 3. Sleek Audio Player & Live Waveform
- Floating modular dock pinned to the bottom viewport.
- **Waveform Canvas:** Dynamic array of vertical bars oscillating between `#00f2fe` and `#38bdf8`. Inactive bars sit at `rgba(148, 163, 184, 0.2)`.
- **Playback Controls:** Minimalist circular controls with time scrubbing bar featuring an ambient cyan glowhead.
- **Live Transcription Indicator:** Inline pill displaying `● Grabando clase...` in `#f43f5e` with an audio meter visualizer.

### 4. Chips & Metadata Tags
- Fully rounded pills (`padding: 0.25rem 0.75rem`).
- Subject tagging (e.g., "Historia de España", "Física Cuántica") renders with neutral borders (`rgba(148, 163, 184, 0.15)`) and slate text. Active filtering lights up in saturated primary cyan.

### 5. Input Fields & Search Bars
- Background `rgba(15, 23, 42, 0.5)` with `1px solid rgba(148, 163, 184, 0.15)`.
- Focus shifts border to `#00f2fe` with an inner ring shadow `0 0 0 1px #00f2fe`. Placeholder text styled in subdued `#64748b`.
- Embedded shortcut hint (e.g., `⌘K Preguntar al tutor IA`) highlighted in a micro keyboard pill.

### 6. Checkboxes & Radio Nodes
- Obsidian base, `border: 1.5px solid rgba(148, 163, 184, 0.3)`. Checked state transitions instantly to solid `#00f2fe` with a high-contrast dark `#07090e` checkmark icon and slight exterior bloom.