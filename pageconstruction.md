# Page & Component Construction Guide

This document outlines the standard architecture for building modular, CMS-driven pages and sections in this project. All components follow a **"Dynamic-First with Static Fallback"** pattern, ensuring the site remains functional even without a database connection.

---

## 1. Core Architecture: Section-Based Pages

Every page (e.g., `AboutPage.tsx`, `HomePage.tsx`) is a collection of independent **Sections**. These sections are defined as `PageBlock` items within the CMS `Page` object.

### The `Page` Interface
Located in `lib/store/pages/pageType.ts`, this defines the structure of our data:

```typescript
export interface Page {
  title: LocalizedText;
  slug: string;
  content: PageBlock[]; // Array of sections
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  isPublished: boolean;
}

export interface PageBlock {
  id: string;
  type: string;
  adminTitle?: string; // Used to identify the section (e.g., "Hero", "Services")
  props: any;         // Section-specific settings (heading, images, etc.)
  content: any[];     // Array of items within the section (e.g., grid items)
}
```


eample of section
1    {
      "id": "hero-section-wrapper",
      "type": "section",
      "adminTitle": "Hero",
      "layout": "grid-1",
      "columns": [
        [
          {
            "id": "hero-carousel",
            "type": "carousel",
            "items": [
              {
                "id": "slide-1",
                "adminTitle": "Modern Living Slide",
                "type": "section",
                "layout": "grid-2",
                "columns": [
                  [
                    {
                      "id": "slide1-label",
                      "type": "heading",
                      "level": "h5",
                      "text": "Modern Living"
                    },
                    {
                      "id": "slide1-heading",
                      "type": "heading",
                      "level": "h1",
                      "text": "Furniture That Defines Your Space."
                    },
                    {
                      "id": "slide1-desc",
                      "type": "paragraph",
                      "text": "Discover sculptural sofas, refined textures, and timeless furniture pieces crafted to bring warmth, comfort, and luxury into the modern home."
                    },
                    {
                      "id": "slide1-btn",
                      "type": "button",
                      "buttons": [
                        {
                          "label": "Explore Collection",
                          "link": "/shop",
                          "actionType": "link"
                        },
                        {
                          "label": "Shop New Arrivals",
                          "link": "/shop/new",
                          "actionType": "link"
                        }
                      ]
                    }
                  ],
                  [
                    {
                      "id": "slide1-img",
                      "type": "image",
                      "url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1800",
                      "alt": "The Archi Sofa"
                    },
                    {
                      "id": "slide1-product-card",
                      "type": "cards",
                      "items": [
                        {
                          "title": "The Archi Sofa",
                          "description": "Starting at ₹1,200\n\nPremium materials, sculptural comfort, and a refined silhouette designed for modern interiors."
                        }
                      ]
                    }
                  ]
                ]
              },
              {
                "id": "slide-2",
                "adminTitle": "Bedroom Luxury Slide",
                "type": "section",
                "layout": "grid-2",
                "columns": [
                  [
                    {
                      "id": "slide2-label",
                      "type": "heading",
                      "level": "h5",
                      "text": "Bedroom Luxury"
                    },
                    {
                      "id": "slide2-heading",
                      "type": "heading",
                      "level": "h1",
                      "text": "Designed For Quiet Comfort."
                    },
                    {
                      "id": "slide2-desc",
                      "type": "paragraph",
                      "text": "Elevate your bedroom with calming palettes, elegant beds, and thoughtfully designed furniture that blends sophistication with everyday ease."
                    },
                    {
                      "id": "slide2-btn",
                      "type": "button",
                      "buttons": [
                        {
                          "label": "Explore Collection",
                          "link": "/shop",
                          "actionType": "link"
                        },
                        {
                          "label": "Shop New Arrivals",
                          "link": "/shop/new",
                          "actionType": "link"
                        }
                      ]
                    }
                  ],
                  [
                    {
                      "id": "slide2-img",
                      "type": "image",
                      "url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1800",
                      "alt": "The Haven Bed"
                    },
                    {
                      "id": "slide2-product-card",
                      "type": "cards",
                      "items": [
                        {
                          "title": "The Haven Bed",
                          "description": "Starting at ₹1,450\n\nPremium materials, sculptural comfort, and a refined silhouette designed for modern interiors."
                        }
                      ]
                    }
                  ]
                ]
              },
              {
                "id": "slide-3",
                "adminTitle": "Dining Collection Slide",
                "type": "section",
                "layout": "grid-2",
                "columns": [
                  [
                    {
                      "id": "slide3-label",
                      "type": "heading",
                      "level": "h5",
                      "text": "Dining Collection"
                    },
                    {
                      "id": "slide3-heading",
                      "type": "heading",
                      "level": "h1",
                      "text": "Gather Around Beautifully Crafted Tables."
                    },
                    {
                      "id": "slide3-desc",
                      "type": "paragraph",
                      "text": "Create memorable dining moments with statement tables, elegant chairs, and premium finishes tailored for contemporary interiors."
                    },
                    {
                      "id": "slide3-btn",
                      "type": "button",
                      "buttons": [
                        {
                          "label": "Explore Collection",
                          "link": "/shop",
                          "actionType": "link"
                        },
                        {
                          "label": "Shop New Arrivals",
                          "link": "/shop/new",
                          "actionType": "link"
                        }
                      ]
                    }
                  ],
                  [
                    {
                      "id": "slide3-img",
                      "type": "image",
                      "url": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1800",
                      "alt": "The Forma Table"
                    },
                    {
                      "id": "slide3-product-card",
                      "type": "cards",
                      "items": [
                        {
                          "title": "The Forma Table",
                          "description": "Starting at ₹980\n\nPremium materials, sculptural comfort, and a refined silhouette designed for modern interiors."
                        }
                      ]
                    }
                  ]
                ]
              }
            ]
          }
        ]
      ]
    },

    example 2
      {
      "id": "about-nestcraft-section",
      "type": "section",
      "props": {
        "badge": {
          "en": "About NestCraft mnaish",
          "hi": "नेस्टक्राफ्ट के बारे में"
        },
        "heading": {
          "en": "Furniture that brings warmth, purpose, and modern character home.",
          "hi": "फर्नीचर जो घर में गर्माहट, उद्देश्य और आधुनिक चरित्र लाता है।"
        },
        "description": {
          "en": "Since 2012, NestCraft has been creating design-led furniture that blends sculptural form with everyday function—helping people build homes that feel calm, personal, and beautifully lived in.",
          "hi": "2012 से, नेस्टक्राफ्ट डिजाइन-आधारित फर्नीचर बना रहा है जो मूर्तिकला रूप को रोजमर्रा के कार्य के साथ जोड़ता है—लोगों को ऐसे घर बनाने में मदद करता है जो शांत, व्यक्तिगत और खूबसूरती से रहने योग्य महसूस होते हैं।"
        },
        "primaryButton": {
          "en": "Explore Collection",
          "hi": "संग्रह देखें"
        },
        "secondaryButton": {
          "en": "Contact Us jjdjjdjd",
          "hi": "संपर्क करें"
        },
        "backgroundImage": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1800"
      },
      "content": [
        {
          "id": "img-1",
          "type": "item",
          "props": {
            "image": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
            "alt": {
              "en": "Sofa interior",
              "hi": "सोफा इंटीरियर"
            }
          }
        },
        {
          "id": "img-2",
          "type": "item",
          "props": {
            "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200",
            "alt": {
              "en": "Chair and decor",
              "hi": "कुर्सी और सजावट"
            }
          }
        }
      ],
      "columns": [],
      "adminTitle": "About NestCraft",
      "layout": "hero"
    },
---

## 2. Section Implementation Pattern

Each section component must handle its own data logic to ensure it can be dropped into any page.

### Key Logic: Data Merging
Every section should merge data from three sources in this priority:
1.  **CMS Props**: Data coming from the `currentPages` Redux store.
2.  **CMS Content**: Array items coming from the `currentPages` Redux store.
3.  **Static Fallback**: A local `defaultData.ts` file used if no CMS data exists.

#### Example Logic (`AboutNestcraft.tsx`):
```tsx
const section = useMemo(() => {
  if (!currentPages) return null;
  return currentPages.content?.find((s: any) => s?.adminTitle === "About NestCraft");
}, [currentPages]);

const { p, content } = useMemo(() => {
  return {
    p: (section as any)?.props || defaultData.props,
    content: (section as any)?.content || defaultData.content,
  };
}, [section]);
```

---

## 3. Page-Level Implementation

Pages are responsible for identifying which `Page` object to fetch from the store based on the URL.

### About Page Pattern
The `AboutPage` uses the URL slug to find and set the current page data.

```tsx
const pathname = usePathname();
const slug = pathname.split("/")?.[2]; // Extract slug from URL

useEffect(() => {
  if (allPages?.length > 0 && slug) {
    const currentPage = allPages.find((item: Page) => item.slug === slug);
    if (currentPage) {
      dispatch(setCurrentPages(currentPage));
    }
  }
}, [allPages, slug]);
```

### Home Page Pattern
The `HomePage` can either receive data as a prop or rely on the `currentPages` store, often using a helper to extract sections.

```tsx
const getSection = (content: any, adminTitle: string) => 
  Array.isArray(content) ? content.find(s => s?.adminTitle === adminTitle) : undefined;

// In component:
const content = currentPages?.content || data?.content;
return (
  <>
    <Hero section={getSection(content, "Hero")} />
    <USP />
  </>
);
```

---

## 4. Technical Requirements for Sections

-   **Directive**: Always use `"use client"`.
-   **Localization**: Detect `lang` from the pathname (`/hi` vs default `en`).
-   **Identification**: Use `adminTitle` to match sections in the CMS.
-   **Annotations**: Root element MUST have `data-annotate-id` for CMS integration.
-   **Animations**: Use `motion` from `motion/react`.

### Localization Snippet
```tsx
const lang = useMemo(() => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] === "hi" ? "hi" : "en";
}, [pathname]);

// Usage:
const heading = p.heading?.[lang] || p.heading?.en || "";
```

---

## 5. Folder Structure Recommendation

---

## 6. AI Generation Prompt Template (For AI Assistants)

To generate a new section that perfectly fits this project's architecture, use the following prompt. Copy and paste it, replacing the **[BRACKETED_TEXT]** with your specific needs.

### The Prompt:

> **Task:** Create a new modular section called **[COMPONENT_NAME]** (e.g., "TeamSection").
> 
> **1. Data Structure (`[FILENAME]Data.ts`):**
> Create a TypeScript file with `default[COMPONENT_NAME]Data`. It must include:
> - `props`: A flat object for primary text/settings. Every text field MUST be a `LocalizedText` object: `{ en: "...", hi: "..." }`.
> - `content`: An array of items (e.g., team members) where each item has its own `props` (localized) and an `id`.
> 
> **2. Component Logic (`[COMPONENT_NAME].tsx`):**
> - Add `"use client"` and imports: `usePathname`, `useAppSelector`, `useMemo`, and `motion`.
> - Implement **Language Detection**: Detect `en` or `hi` from the pathname.
> - Implement **CMS Integration**: Use `useAppSelector` to get `currentPages`. Find the section where `adminTitle === "[CMS_ADMIN_TITLE]"`.
> - Implement **Data Merging**: Merge `section.props` with `defaultData.props` and `section.content` with `defaultData.content`.
> - Implement **Localization Helper**: Use a helper to extract localized strings: `p.field?.[lang] || p.field?.en || ""`.
> 
> **3. UI & Styling:**
> - Use **Tailwind CSS** for a premium, responsive layout.
> - Root element MUST have `data-annotate-id="[PAGE_NAME]-[SECTION_ID]-section"` for CMS highlighting.
> - Use **Framer Motion** for entrance animations (fade up, scale, etc.).
> - Use the project's design tokens (e.g., `text-secondary`, `bg-background`, `border-border`).
> 
> **Specific Section Requirements:**
> [DESCRIBE THE LAYOUT: e.g., "A grid of profile cards with images, names, and social links."]
