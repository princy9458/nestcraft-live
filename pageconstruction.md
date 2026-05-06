# Component Construction Guide

This document outlines the standard architecture for building modular, CMS-driven homepage sections in this project. All components follow a "Dynamic-First with Static Fallback" pattern, supporting bilingual content (EN/HI) and seamless integration with the Redux-based CMS.

## 1. Project Architecture Pattern

Each section consists of two primary files:
1.  **`SectionData.ts`**: Contains the default/static data used as a fallback if the CMS data is unavailable.
2.  **`SectionComponent.tsx`**: The React component that handles data fetching, localization logic, and rendering.

### Key Technical Requirements:
- **Client-Side Rendering**: Use `"use client"` directive.
- **Bilingual Support**: Extract language from the URL pathname (`/hi` for Hindi, default to `en`).
- **Dynamic Fetching**: Use `useAppSelector` to get `currentPages` from Redux.
- **Section Identification**: Match sections using `adminTitle`.
- **Annotations**: Include `data-annotate-id` on the root element for CMS highlighting.
- **Animations**: Use `motion` from `motion/react` (framer-motion).

---

## 2. Component Prompt Template

To generate a new section that fits perfectly into the codebase, use the following prompt. Replace the **[BRACKETED_TEXT]** with your specific requirements.

### The Prompt:

> Create a new modular homepage section called **[COMPONENT_NAME]** (e.g., "ServicesSection").
> 
> **1. Data Structure (`[FILENAME]Data.ts`):**
> Create a TypeScript file containing a `default[COMPONENT_NAME]Data` object. It must have:
> - `props`: Objects for text fields like `badge`, `heading`, `subheading`, `buttonLabel`, etc. Each text field should be a localized object: `{ en: "Text", hi: "पाठ" }`.
> - `content`: An array of items (e.g., icons, images, descriptions) representing the main content of the section. Each item should also support localized `props`.
> 
> **2. Component Logic (`[COMPONENT_NAME].tsx`):**
> - Add `"use client"` at the top.
> - Implement a `lang` detection helper using `usePathname()`. If the path starts with `/hi`, set `lang` to `"hi"`, otherwise `"en"`.
> - Use `useAppSelector` to fetch `currentPages` from `@/lib/store/hooks`.
> - Implement a `getCurrentSection` memoized constant that finds the section in `currentPages.content` where `adminTitle === "[ADMIN_TITLE_IN_CMS]"`.
> - Merge props: `const p = (section as any)?.props || defaultData.props;`.
> - Extract localized values using the logic: `p.heading?.[lang] || p.heading?.en || p.heading || ""`.
> 
> **3. UI & Styling:**
> - Use Tailwind CSS for a premium, responsive layout.
> - Root element must have `data-annotate-id="home-[ID]-section"`.
> - Use `motion` for subtle entrance animations (e.g., `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`).
> - Use the project's color palette (e.g., `text-secondary`, `bg-muted/10`, `border-border`).
> 
> **Specific Section Requirements:**
> [DESCRIBE THE LAYOUT: e.g., "A 3-column grid of service cards with icons and descriptions."]

---

## 3. Example Folder Structure

```text
components/homepage/[section-name]/
├── [SectionName].tsx
└── [sectionName]Data.ts
```

## 4. Localization Helper Snippet

Always include this logic inside the component to ensure it responds to language changes:

```tsx
const pathname = usePathname();
const lang = useMemo(() => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] === "hi" ? "hi" : "en";
}, [pathname]);
```

## 5. CMS Identification Snippet

```tsx
const getCurrentSection = useMemo(() => {
  if (!currentPages) return;
  return currentPages.content?.find((page: any) => page?.adminTitle === "YOUR_ADMIN_TITLE");
}, [currentPages]);
```
