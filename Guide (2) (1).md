# Business Site CMS Architecture (Strict Specification v2.5)

This document is the **single source of truth** for building high-fidelity, multilingual business websites (pages, projects, case studies, forms) using our modular CMS pattern. This architecture ensures that any website can be dynamically constructed from JSON while maintaining a premium, minimalist design and robust dynamic routing.

---

## 1. Technology Stack

- **Frontend Framework**: Next.js (Latest Version, App Router)
- **Routing**: Dynamic `[locale]` segments for URL-based language switching (e.g., `/en`, `/hi`).
- **Styling**: Tailwind CSS + Framer Motion (Layout & Animation)
- **Design Tokens**: Global CSS classes defined in `globals.css` (Strictly for Text & Colors)
- **Data Persistence**: MongoDB (via FastAPI backend) or localized JSON configuration.
- **CMS Logic**: Dynamic, configuration-driven rendering based on prompt-ready schemas.

---

## 2. Core Pattern: `{ type, value }`

Every editable prop in a component is wrapped in a self-describing object.

```json
"title": {
  "type": "text",
  "value": { "en": "Modern Solutions", "hi": "आधुनिक समाधान" }
}
```

- `type` declares **which input renderer** the CMS uses.
- `value` holds the actual content. Localized fields use the `{ "en": "...", "hi": "..." }` shape; non-localized fields (image URL, link, icon name, boolean, number, select option) use a raw scalar.

---

## 3. Multilingual Routing Protocol

1.  **Dynamic Segment**: All routes must be wrapped in a `[locale]` dynamic segment in the `src/app` directory.
2.  **Root Redirect**: The root `page.tsx` at `src/app/page.tsx` must redirect to the default locale (e.g., `/en`).
3.  **Prop Resolution**: Components must use a `resolveProps(props, locale)` utility to serve the correct localized string.
4.  **Language Switcher**: The `Navbar` must include a switcher that updates the URL locale segment.

---

## 4. Allowed Field Types — Whitelist (NO EXCEPTIONS)

Only the field types listed below are permitted in any component's `props`.

| `type`     | Purpose                          | `value` Shape                         | Localized? |
| ---------- | -------------------------------- | ------------------------------------- | ---------- |
| `text`     | Short single-line string         | `{ "en": "...", "hi": "..." }`        | Yes        |
| `textarea` | Long multi-line string           | `{ "en": "...", "hi": "..." }`        | Yes        |
| `image`    | Media URL from the Media Library | `"https://..."`                       | No         |
| `link`     | Internal path or external URL    | `"/projects"` or `"https://..."`      | No         |
| `icon`     | Lucide icon identifier           | `"Activity"`, `"Shield"`              | No         |
| `boolean`  | Toggle (true/false)              | `true` or `false`                     | No         |
| `number`   | Numeric input                    | `100`                                 | No         |
| `select`   | Dropdown of predefined options   | `"h2"` (one of an enum)               | No         |
| `list`     | Array of localized strings       | `[{ "en": "...", "hi": "..." }, ...]` | Items: Yes |

---

## 5. Mandatory Folder Structure

To maintain clarity and scalability, follow this structure strictly:

```
src/
├── app/                         # App Router Root
│   ├── [locale]/                # Dynamic locale segment (e.g., /en, /hi)
│   │   ├── layout.tsx           # Root layout - sets <html lang={locale}>
│   │   └── page.tsx             # Route Entry - Proxies to src/pages/home/page.tsx
│   └── page.tsx                 # Root Redirect to /en
│
├── components/                  # Global reusable UI (Buttons, Cards, Modals)
│   └── <ComponentName>/
│       └── <ComponentName>.tsx  # Component file inside its own folder
│
├── pages/                       # Page-specific entries
│   └── <PageName>/              # e.g., "home", "about", "projects"
│       ├── page.tsx             # Main page component & section mapper
│       └── sections/            # Sections specific to THIS page (Flat folder)
│           ├── HeroSection.tsx
│           ├── ProjectGridSection.tsx
│           └── ContactFormSection.tsx
│
├── lib/                         # Utilities (resolveProps.ts, etc.)
├── data/                        # JSON content files (home-page.json)
└── styles/
    └── globals.css              # The ONLY source of truth for colors and typography
```

---

## 6. Styling & Layout Restrictions

### 6.1 The "Global Only" Rule for Text & Color
Tailwind CSS is allowed **only for layout and spacing** (e.g., `flex`, `grid`, `p-8`, `gap-4`).

**STRICT RESTRICTION**: All text colors, background colors, and font families MUST use global CSS classes defined in `globals.css`.
- ✅ `<h1 className="bs-h1 bs-text-primary">`
- ❌ `<h1 className="text-blue-500 font-serif">`

### 6.2 Framer Motion
Use Framer Motion for all entry animations. Keep them subtle (e.g., `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`).

---

## 7. Design Guidelines: Attractive & Minimalist

### 7.1 Minimalist Aesthetics
- **Whitespace**: Use generous padding (e.g., `py-24` or `py-32`).
- **Color Palette**: Stick to a 3-color primary palette. Use subtle gradients.
- **Borders**: Use very thin, light borders (`bs-border`) or soft shadows.

### 7.2 Typography Hierarchy
- **Scale**: Clear distinction between `bs-display`, `bs-h1` to `bs-h4`, and `bs-body`.
- **Letter Spacing**: `tracking-tight` for headings, `tracking-widest` for eyebrows.

### 7.3 Visual Flourish
- **Glassmorphism**: Use `backdrop-blur` for overlays and navigation (`bs-glass`).
- **Smooth Transitions**: Every hover state should have a transition.

---

## 8. Business-Specific Component Whitelist

### `hero-section`
High-impact intro with title, description, and primary CTA.
### `project-card` / `project-grid`
Image, title, category, and link for business projects.
### `stats-grid`
Numbers and labels to show business impact.
### `form-contact`
Input fields for lead generation with minimalist styling.
### `process-section`
Step-by-step business execution model.

---

## 9. `globals.css` Template

```css
:root {
  /* ---------- Design Tokens ---------- */
  --bs-bg: #ffffff;
  --bs-surface: #f8f9fa;
  --bs-primary: #1a1a1a;
  --bs-accent: #0070f3;
  --bs-text: #333333;
  --bs-muted: #666666;
  --bs-border: #eaeaea;
  
  --bs-radius-md: 12px;
  --bs-radius-lg: 20px;
}

/* ---------- Typography Classes ---------- */
.bs-h1 { font-size: 3.5rem; font-weight: 800; line-height: 1.1; color: var(--bs-primary); }
.bs-h2 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; color: var(--bs-primary); }
.bs-body { font-size: 1.125rem; line-height: 1.6; color: var(--bs-text); }
.bs-caption { font-size: 0.875rem; color: var(--bs-muted); }

/* ---------- Utility Classes ---------- */
.bs-text-primary { color: var(--bs-primary); }
.bs-text-muted { color: var(--bs-muted); }
.bs-text-accent { color: var(--bs-accent); }
.bs-bg-surface { background: var(--bs-surface); }
.bs-bg-accent { background: var(--bs-accent); color: white; }
.bs-border { border: 1px solid var(--bs-border); }
```

---

## 10. Project Generation Prompt (For Agents)

> **"Act as a Senior Creative Developer. Create a premium, high-fidelity business website for [COMPANY NAME] that is MULTILINGUAL BY DEFAULT, strictly following the Guide.md specification.**
>
> **Core Requirements:**
> 1. **Routing**: Implement dynamic `[locale]` segments in `src/app` with a root redirect to `/en`.
> 2. **Structure**: Follow the nested `src/pages/<PageName>/sections/` folder pattern exactly.
> 3. **Data**: All editable props must support `{ en, hi }` localization.
> 4. **Styling**: Define design tokens in `globals.css`. Use Tailwind ONLY for layout.
> 5. **Navigation**: Include a fixed glassmorphism Navbar with a language switcher that updates the URL locale segment."

---

## 11. Example Page JSON

Use this structure for the `home-page.json` file. Notice the mandatory `{ en, hi }` localization for all text fields.

```json
{
  "id": "page_home_it",
  "title": { "en": "NexTech Solutions | Enterprise IT Services", "hi": "नेक्स्टेक सॉल्यूशंस | एंटरप्राइज आईटी सेवाएं" },
  "slug": "home",
  "isPublished": true,
  "metaTitle": {
    "en": "NexTech Solutions - Leading IT Service Provider",
    "hi": "नेक्स्टेक सॉल्यूशंस - अग्रणी आईटी सेवा प्रदाता"
  },
  "metaDescription": {
    "en": "We provide cutting-edge cloud, security, and AI solutions for modern enterprises.",
    "hi": "हम आधुनिक उद्यमों के लिए अत्याधुनिक क्लाउड, सुरक्षा और एआई समाधान प्रदान करते हैं।"
  },
  "content": [
    {
      "id": "sec_hero",
      "type": "hero-section",
      "props": {
        "badge": { "type": "text", "value": { "en": "Next-Gen Infrastructure", "hi": "अगली पीढ़ी का बुनियादी ढांचा" } },
        "title": { "type": "text", "value": { "en": "Architecting the Future of", "hi": "भविष्य की वास्तुकला" } },
        "highlight": { "type": "text", "value": { "en": "Digital Enterprise", "hi": "डिजिटल एंटरप्राइज" } },
        "description": { "type": "textarea", "value": { "en": "NexTech Solutions empowers businesses with scalable cloud architectures, ironclad cybersecurity, and transformative AI-driven insights.", "hi": "नेक्स्टेक सॉल्यूशंस स्केलेबल क्लाउड आर्किटेक्चर, मजबूत साइबर सुरक्षा और परिवर्तनकारी एआई-संचालित अंतर्दृष्टि के साथ व्यवसायों को सशक्त बनाता है।" } },
        "primaryCTA": { "type": "text", "value": { "en": "Get Started", "hi": "शुरू करें" } },
        "primaryLink": { "type": "link", "value": "/contact" },
        "secondaryCTA": { "type": "text", "value": { "en": "Our Services", "hi": "हमारी सेवाएं" } },
        "secondaryLink": { "type": "link", "value": "#services" },
        "image": { "type": "image", "value": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800" }
      }
    },
    {
      "id": "sec_stats",
      "type": "stats-grid",
      "props": {},
      "content": [
        {
          "id": "stat_1",
          "type": "stat-item",
          "props": {
            "value": { "type": "text", "value": { "en": "10+", "hi": "10+" } },
            "label": { "type": "text", "value": { "en": "Years Experience", "hi": "वर्षों का अनुभव" } }
          }
        },
        {
          "id": "stat_2",
          "type": "stat-item",
          "props": {
            "value": { "type": "text", "value": { "en": "500+", "hi": "500+" } },
            "label": { "type": "text", "value": { "en": "Global Clients", "hi": "वैश्विक ग्राहक" } }
          }
        },
        {
          "id": "stat_3",
          "type": "stat-item",
          "props": {
            "value": { "type": "text", "value": { "en": "99.9%", "hi": "99.9%" } },
            "label": { "type": "text", "value": { "en": "Uptime Guarantee", "hi": "अपटाइम गारंटी" } }
          }
        },
        {
          "id": "stat_4",
          "type": "stat-item",
          "props": {
            "value": { "type": "text", "value": { "en": "24/7", "hi": "24/7" } },
            "label": { "type": "text", "value": { "en": "Expert Support", "hi": "विशेषज्ञ सहायता" } }
          }
        }
      ]
    },
    {
      "id": "sec_services",
      "type": "service-grid",
      "props": {
        "badge": { "type": "text", "value": { "en": "Our Expertise", "hi": "हमारी विशेषज्ञता" } },
        "title": { "type": "text", "value": { "en": "Solutions That Scale", "hi": "स्केलेबल समाधान" } }
      },
      "content": [
        {
          "id": "serv_1",
          "type": "service-item",
          "props": {
            "icon": { "type": "icon", "value": "Cloud" },
            "title": { "type": "text", "value": { "en": "Cloud Migration", "hi": "क्लाउड माइग्रेशन" } },
            "description": { "type": "textarea", "value": { "en": "Seamlessly transition your infrastructure to AWS, Azure, or GCP with zero downtime.", "hi": "बिना किसी डाउनटाइम के अपने बुनियादी ढांचे को AWS, Azure या GCP में निर्बाध रूप से स्थानांतरित करें।" } }
          }
        },
        {
          "id": "serv_2",
          "type": "service-item",
          "props": {
            "icon": { "type": "icon", "value": "Shield" },
            "title": { "type": "text", "value": { "en": "Cybersecurity", "hi": "साइबर सुरक्षा" } },
            "description": { "type": "textarea", "value": { "en": "Protect your digital assets with advanced threat detection and zero-trust security.", "hi": "उन्नत खतरे का पता लगाने और शून्य-विश्वास सुरक्षा के साथ अपनी डिजिटल संपत्ति की रक्षा करें।" } }
          }
        },
        {
          "id": "serv_3",
          "type": "service-item",
          "props": {
            "icon": { "type": "icon", "value": "Cpu" },
            "title": { "type": "text", "value": { "en": "AI & Analytics", "hi": "एआई और एनालिटिक्स" } },
            "description": { "type": "textarea", "value": { "en": "Unlock the power of your data with custom machine learning models and big data insights.", "hi": "कस्टम मशीन लर्निंग मॉडल और बिग डेटा अंतर्दृष्टि के साथ अपने डेटा की शक्ति को अनलॉक करें।" } }
          }
        }
      ]
    },
    {
      "id": "sec_projects",
      "type": "project-grid",
      "props": {
        "badge": { "type": "text", "value": { "en": "Case Studies", "hi": "केस स्टडीज" } },
        "title": { "type": "text", "value": { "en": "Real Impact, Delivered.", "hi": "वास्तविक प्रभाव।" } }
      },
      "content": [
        {
          "id": "proj_1",
          "type": "project-card",
          "props": {
            "title": { "type": "text", "value": { "en": "Global Bank Migration", "hi": "ग्लोबल बैंक माइग्रेशन" } },
            "category": { "type": "text", "value": { "en": "Cloud Infrastructure", "hi": "क्लाउड इंफ्रास्ट्रक्चर" } },
            "image": { "type": "image", "value": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
            "link": { "type": "link", "value": "/projects/bank-migration" }
          }
        },
        {
          "id": "proj_2",
          "type": "project-card",
          "props": {
            "title": { "type": "text", "value": { "en": "AI-Powered Logistics", "hi": "एआई-पावर्ड लॉजिस्टिक्स" } },
            "category": { "type": "text", "value": { "en": "Machine Learning", "hi": "मशीन लर्निंग" } },
            "image": { "type": "image", "value": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
            "link": { "type": "link", "value": "/projects/ai-logistics" }
          }
        }
      ]
    },
    {
      "id": "sec_process",
      "type": "process-section",
      "props": {
        "badge": { "type": "text", "value": { "en": "How We Work", "hi": "हम कैसे काम करते हैं" } },
        "title": { "type": "text", "value": { "en": "Our Execution Model", "hi": "हमारा निष्पादन मॉडल" } }
      },
      "content": [
        {
          "id": "step_1",
          "type": "step-item",
          "props": {
            "number": { "type": "text", "value": { "en": "01", "hi": "01" } },
            "title": { "type": "text", "value": { "en": "Discovery", "hi": "खोज" } },
            "description": { "type": "text", "value": { "en": "We analyze your current infrastructure and identify gaps.", "hi": "हम आपके वर्तमान बुनियादी ढांचे का विश्लेषण करते हैं।" } }
          }
        },
        {
          "id": "step_2",
          "type": "step-item",
          "props": {
            "number": { "type": "text", "value": { "en": "02", "hi": "02" } },
            "title": { "type": "text", "value": { "en": "Optimization", "hi": "अनुकूलन" } },
            "description": { "type": "text", "value": { "en": "Our experts design a tailored strategy for your business.", "hi": "हमारे विशेषज्ञ आपकी रणनीति तैयार करते हैं।" } }
          }
        },
        {
          "id": "step_3",
          "type": "step-item",
          "props": {
            "number": { "type": "text", "value": { "en": "03", "hi": "03" } },
            "title": { "type": "text", "value": { "en": "Deployment", "hi": "तैनाती" } },
            "description": { "type": "text", "value": { "en": "Seamless implementation with continuous monitoring.", "hi": "निरंतर निगरानी के साथ निर्बाध कार्यान्वयन।" } }
          }
        }
      ]
    },
    {
      "id": "sec_contact",
      "type": "form-contact",
      "props": {
        "title": { "type": "text", "value": { "en": "Let's Build Something Great", "hi": "आइए कुछ महान बनाएं" } },
        "description": { "type": "textarea", "value": { "en": "Ready to transform your digital landscape? Contact us today.", "hi": "क्या आप अपने डिजिटल परिदृश्य को बदलने के लिए तैयार हैं?" } },
        "buttonLabel": { "type": "text", "value": { "en": "Send Message", "hi": "संदेश भेजें" } }
      }
    }
  ]
}
```

---

## 12. Versioning
Version 2.5 - May 2026

## 13. AI Website Generation Rules

When generating websites, sections, or components:

### Mandatory Requirements

## AI Website Generation Rules

- Every page MUST be rendered dynamically from JSON configuration.

- Every section `type` MUST map to a React component through a centralized registry system.
- Every section component MUST be reusable and schema-driven.
- Every section MUST support multilingual content rendering.
- Every component MUST receive all content through props or structured section data.
- No business-specific hardcoded content is allowed inside TSX components.
- All section content MUST originate from JSON or CMS data.
- Child blocks inside sections MAY reuse shared block types.
- All sections MUST be independently renderable.
- All sections MUST support responsive layouts.
- All sections MUST support accessibility standards.

### AI Output Requirements

The AI MUST generate:

1. Folder structure
2. TSX component files
3. sectionData.ts files
4. TypeScript interfaces
5. Page JSON
6. Section registry mappings
7. Dynamic page renderer
8. SEO metadata
9. Responsive layouts
10. Accessibility-ready HTML

### Naming Conventions

Section types MUST use kebab-case:

Examples:
- hero-slider
- faq-section
- project-grid
- stats-grid

Component folders MUST use PascalCase:

Examples:
- HeroSlider
- FAQSection
- StatsGrid

### Rendering Rules

All sections MUST be rendered dynamically using:

```tsx
const Component = sectionRegistry[section.type];
```

Never hardcode section rendering inside pages.

### JSON Rules

Every section MUST contain:

```json
{
  "id": "",
  "type": "",
  "layout": "",
  "props": {},
  "content": []
}
```

### Content Rules

Generated content MUST:
- feel realistic
- feel premium
- avoid placeholder text
- avoid lorem ipsum
- use conversion-focused copywriting

### Design Rules

Generated websites MUST feel:
- modern
- premium
- spacious
- editorial
- minimalist
- enterprise-grade

### Animation Rules

Use:
- subtle fade-up animations
- stagger transitions
- smooth hover interactions

## 14. Section Registry System

All top-level sections MUST be resolved through a centralized section registry.

The registry is responsible for mapping section `type` values to React components.

Example:

```ts
import HeroSlider from "@/components/homepage/HeroSlider/HeroSlider";
import FAQSection from "@/components/homepage/FAQSection/FAQSection";

export const sectionRegistry = {
  "hero-slider": HeroSlider,
  "faq-section": FAQSection,
};
```

---

### Registry Rules

- Every top-level section `type` MUST exist in the registry.
- Registry keys MUST use kebab-case naming.
- Component names MUST use PascalCase naming.
- All section rendering MUST resolve dynamically from the registry.
- Never use switch statements for section rendering.
- Never hardcode section rendering inside `page.tsx`.
- Never directly import individual sections inside page files.
- Section rendering MUST remain schema-driven and scalable.

---

### Dynamic Rendering Example

```tsx
const Component = sectionRegistry[section.type];

if (!Component) return null;

return (
  <Component
    key={section.id}
    section={section}
  />
);
```

---

### Fallback Rules

- Missing section types MUST fail safely.
- Unknown section types SHOULD render:
  - null
  - fallback UI
  - or development warnings.

Example:

```tsx
if (!Component) {
  console.warn(
    `Unknown section type: ${section.type}`
  );

  return null;
}
```

---

### Scalability Rules

The registry system MUST support:
- reusable sections
- AI-generated pages
- dynamic CMS rendering
- lazy loading
- multi-page websites
- white-label systems

---

### Architecture Goals

The rendering architecture MUST follow:

JSON
→ Section Registry
→ Dynamic Component Resolution
→ Rendered Website

The registry MUST act as the single source of truth for all section rendering.


## 15. Visual Quality Standards

Generated websites MUST follow modern premium UI standards inspired by:

- Apple
- Stripe
- Framer
- Linear
- Notion
- Awwwards-style minimalism

### Visual Characteristics

- Large typography
- Spacious layouts
- Strong visual hierarchy
- Elegant whitespace
- Soft shadows
- Thin borders
- Premium glassmorphism
- Editorial-style sections
- Balanced section rhythm

### UX Standards

- Conversion-focused layouts
- Clear CTA hierarchy
- Accessible navigation
- Mobile-first responsiveness
- Smooth interactions

## 16. Component Quality Standards

All generated components MUST:

- be reusable
- be modular
- support dynamic props
- support localization
- support accessibility
- support responsive layouts
- avoid business-specific hardcoding

### Required Features

- semantic HTML
- loading safety
- fallback handling
- responsive images
- keyboard accessibility
- clean TypeScript typing
## 19. AI Generation Workflow

The AI generation pipeline should follow:

Prompt
→ Generate page JSON
→ Detect section types
→ Generate section folders
→ Generate TSX components
→ Generate sectionData.ts files
→ Generate registry mappings
→ Generate page renderer
→ Validate JSON schema
→ Final production output

The architecture MUST support:
- prompt-to-website generation
- multi-page websites
- reusable CMS blocks
- dynamic rendering
- white-label systems