# Blog Section Design Guidelines for interesten.be

## Design Approach

**Selected Approach:** Hybrid - Design System Foundation + Financial Authority References

Drawing inspiration from Stripe's editorial sophistication, Medium's reading experience, and modern fintech apps (Revolut, N26) for glassmorphism execution. The design emphasizes trust, readability, and premium positioning while maintaining consistency with existing calculator pages.

**Core Principles:**
- Glassmorphism as accent, not overwhelm
- Generous whitespace for cognitive ease
- Typography-led hierarchy for financial authority
- Strategic visual breaks in long-form content

---

## Typography System

**Font Stack:**
- **Primary (Body/Content):** Inter or System UI for optimal screen readability
- **Display (Headlines):** Space Grotesk or Manrope for modern financial authority
- **Accent (Stats/Numbers):** Tabular figures enabled for all numerical content

**Hierarchy:**
- Article Headlines: 3xl to 5xl (48-60px desktop), bold weight, tight leading (1.1)
- Section Headers: 2xl to 3xl (32-40px), semibold, normal leading (1.3)
- Body Text: lg to xl (18-20px), normal weight, relaxed leading (1.7) - critical for readability
- Meta Information: sm to base (14-16px), medium weight
- Captions/Labels: xs to sm (12-14px), medium weight

---

## Layout System

**Spacing Primitives:** Tailwind units 4, 6, 8, 12, 16, 24, 32
- Micro spacing (component internals): 4, 6
- Standard spacing (between elements): 8, 12, 16
- Section spacing: 24, 32
- Hero/major breaks: 32+

**Grid Structure:**
- **Blog Index:** 3-column grid (lg), 2-column (md), 1-column (mobile)
- **Article View:** Single column max-w-3xl (720px) for optimal reading
- **Sidebar (where used):** 2/3 content + 1/3 sidebar split on desktop

**Container Strategy:**
- Blog index pages: max-w-7xl with full-width hero
- Article pages: max-w-4xl centered for reading comfort
- Sidebar widgets: max-w-sm with glassmorphism cards

---

## Component Library

### Hero Section (Blog Index)
**Large hero image** - Financial imagery (modern office, data visualization, Belgian landmarks with finance theme)
- Full-width background with subtle glassmorphic overlay
- Centered content: Featured article preview
- Headline, excerpt (2-3 lines), author info, read time, category badge
- Primary CTA button with blurred background treatment
- Height: 60vh to 80vh

### Article Cards (Featured/Grid)
**Glassmorphic card structure:**
- Article thumbnail image (16:9 aspect ratio)
- Category badge (top-left overlay on image, blurred background)
- Card body with 8-unit padding:
  - Article title (xl font, semibold, 2-line clamp)
  - Excerpt (base font, 3-line clamp, muted)
  - Author avatar + name, publish date, read time
  - Subtle glassmorphic background with backdrop blur
  - Elevated shadow state
  - Hover: Slight scale (1.02) and enhanced shadow

### Article Page Layout

**Header Section:**
- Category badge
- Article headline (4xl to 5xl)
- Subtitle/excerpt (xl, muted, max-w-2xl)
- Author card: Avatar, name, credentials, social links, publish/updated dates
- Glassmorphic divider with 16-unit vertical spacing

**Content Body:**
- Paragraph spacing: 6 units between paragraphs
- Subheadings: 16 units top margin, 6 units bottom
- Pull quotes: Glassmorphic callout boxes with 12-unit padding, italic, larger font
- Lists: 4-unit item spacing, custom styled bullets/numbers
- Tables: Glassmorphic striping, sticky headers for long tables
- Code blocks: Glassmorphic background, monospace font
- Images: Full-width within reading column, 8-unit vertical margin, captions below
- Info boxes/callouts: Glassmorphic cards with icon, 12-unit padding, accent border

**Sidebar Elements (Desktop):**
- Table of contents (sticky position, glassmorphic card)
- Related articles (3-4 cards, compact layout)
- Newsletter signup (glassmorphic form)
- Category cloud (glassmorphic pill buttons)

### Navigation Components

**Blog Header:**
- Category navigation (horizontal scroll on mobile)
- Search bar (glassmorphic input)
- Filter dropdowns (glassmorphic)
- Breadcrumb trail

**Pagination:**
- Glassmorphic pill buttons
- Previous/Next with article preview on hover (desktop)
- Infinite scroll option with "Load More" glassmorphic button

### Engagement Elements

**Author Bio Box:**
- Glassmorphic card at article end
- Author photo, full bio, social links, "More by this author" CTA

**Related Articles:**
- Horizontal scroll carousel (mobile), 3-column grid (desktop)
- Compact cards with image, title, category

**Newsletter CTA:**
- Glassmorphic section between article and comments
- Compelling headline, value prop, email input with inline submit button
- Trust indicators (subscriber count, frequency)

**Social Sharing:**
- Sticky sidebar on desktop (left side of article)
- Bottom sheet on mobile
- Glassmorphic pill buttons for each platform

---

## Glassmorphism Execution

**Application Patterns:**
- Cards: Frosted background with backdrop blur
- Overlays on images: Blurred backgrounds for text/buttons
- Form inputs: Subtle glass effect with clear focus states
- Modals/dropdowns: Strong glassmorphic treatment
- Hover states: Enhanced blur and elevation

**Consistency with Calculator Pages:**
- Match blur intensity levels
- Replicate border treatments and shadow patterns
- Maintain glassmorphic input field styling
- Use identical button glass effects

---

## Images Strategy

**Image Requirements:**

1. **Hero Section:** Large, impactful financial imagery
   - Belgian professional settings (Brussels skyline, modern offices)
   - Abstract financial concepts (graphs, calculators, savings)
   - People imagery showing trust/expertise
   - Size: 1920x1080 minimum

2. **Article Thumbnails:** 16:9 ratio, 800x450 minimum
   - Topic-specific imagery (investing, loans, savings themes)
   - Consistent visual style across all thumbnails

3. **In-Article Images:** 
   - Infographics, charts, diagrams (full reading width)
   - Illustrative photos every 3-4 paragraphs for visual breaks
   - Screenshots where relevant

4. **Author Photos:** Square, 200x200 minimum, professional headshots

---

## Accessibility & Readability

- Font size minimum 18px for body text
- Line length maximum 75 characters (enforced by max-w-3xl)
- High contrast text (while maintaining glassmorphism aesthetic)
- Skip-to-content link
- Keyboard navigation for all interactive elements
- Alt text required for all images
- Semantic HTML structure (article, section, aside tags)
- Focus states visible on all glassmorphic elements

---

## Responsive Behavior

**Desktop (1024px+):** Full layout with sidebar, 3-column grids
**Tablet (768-1023px):** 2-column grids, sidebar below content
**Mobile (<768px):** Single column, cards stack, horizontal scroll for categories

Spacing scales down proportionally: Desktop padding 32 → Tablet 24 → Mobile 16