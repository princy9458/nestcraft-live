"use client";

import React, { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import Link from "next/link";
import { AnnotatorPlugin } from "../annotationPlugin/AnnotatorPlugin";
import GetAllPages from "./GetAllPages";
import { RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { resetPageComments } from "@/lib/store/comments/commentSlice";
import Hero from "../homepage/hero/Hero";
import USP from "../homepage/usp/USP";
import Services from "../homepage/service/Service";
import Collections from "../homepage/collections/Collections";
import ShopByRoom from "../homepage/shopByRoom/ShopByRoom";
import FeaturedBanner from "../homepage/featuredBanner/FeaturedBanner";
import UpdateCurrentPage from "./UpdateCurrentPage";
import ProductSlider from "../homepage/productSlider/ProductSlider";
import Craft from "../homepage/craft/Craft";
import Testimonials from "../homepage/testimonials/Testimonials";
import Blog from "../homepage/blog/Blog";
import Newsletter from "../homepage/newsletter/Newsletter";
import FAQ from "../homepage/faq/FAQ";
import InstagramGallery from "../homepage/instagram/InstagramGallery";
import GetAuthTokenFastApi from "../wesiteDetail/GetAuthTokenFastApi";
import GetAllMenus from "../cms/menus/GetAllMenus";
import GetAllProducts from "@/lib/GetAllDetails/GetAllProducts";
import GetAllForms from "../forms/GetAllForms";

// --- Types ---
interface HomePageProps {
  data: {
    content: any[];
    [key: string]: any;
  };
}

// --- Helper to extract section mapping ---
const getSection = (content: any, adminTitle: string) => 
  Array.isArray(content) ? content.find(s => s?.adminTitle === adminTitle) : undefined;

const HomePage = ({ data }: HomePageProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { currentPages } = useSelector((state: RootState) => state.pages);
  
  // Ensure content is always an array
  const rawContent = currentPages?.content || data?.content;
  const content = Array.isArray(rawContent) ? rawContent : [];

  useEffect(() => {
    dispatch(resetPageComments());
  }, []);

  const ctaSection = getSection(content, "CTA");
  const ctaBlock = ctaSection?.content?.[0] || ctaSection?.columns?.[0]?.[0];

  const getV = (field: any, lang: string) => {
    if (!field) return "";
    const val = field.value !== undefined ? field.value : field;
    if (val && typeof val === "object") return val[lang] || val.en || "";
    return val || "";
  };

  const pathname = usePathname();
  const lang = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "hi") return "hi";
    return "en";
  }, [pathname]);

  const ctaTitle = getV(ctaBlock?.props?.title, lang) || ctaBlock?.title || "";
  const ctaDescription = getV(ctaBlock?.props?.description, lang) || ctaBlock?.description || "";
  const ctaButtonLabel = getV(ctaBlock?.props?.buttonLabel, lang) || ctaBlock?.buttonLabel || "";
  const ctaButtonLink = ctaBlock?.props?.buttonLink?.value || ctaBlock?.buttonLink || "/shop";

  return (
    <>
      {/* commentsS Plugin */}
      {user?.role == "admin" && <AnnotatorPlugin />}

      {/* get all page from the database */}
      <GetAllPages />
      <GetAllMenus/>
      {/* <GetAllProducts/> */}
      <GetAllForms/>
      <GetAuthTokenFastApi/>
      <UpdateCurrentPage/>

      <Hero section={getSection(content, "Premium Hero Slider") || getSection(content, "Hero")} />
      <USP />
      <Services section={getSection(content, "Services")} />
      <Collections section={getSection(content, "Collections")} />
      <ShopByRoom section={getSection(content, "Shop By Room Section")} />
      <FeaturedBanner section={getSection(content, "FeaturedBanner")} />
      <ProductSlider section={getSection(content, "New Essentials Slider")} />
      <Craft section={getSection(content, "Craft & Quality Section")} />
      <Testimonials section={getSection(content, "Customer Testimonials")} />
      <Blog section={getSection(content, "Latest Blog Posts")} />
      <FAQ section={getSection(content, "Homepage FAQs")} />
      <Newsletter section={getSection(content, "Newsletter Section")} />
      
      <InstagramGallery section={getSection(content, "Instagram Gallery")} />

      {ctaBlock && (
        <section
          data-annotate-id="home-cta-section"
          className="bg-foreground/90 text-surface text-center py-[110px] px-[5%] border-t border-border"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[38px] lg:text-[48px] font-bold tracking-tight">
              {ctaTitle}
            </h2>
            <p className="text-white/70 font-semibold mt-[18px] mb-[34px] max-w-[600px] mx-auto">
              {ctaDescription}
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Link
                href={ctaButtonLink}
                className="bg-primary text-white px-8 h-12 rounded-full text-[14px] font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center"
              >
                {ctaButtonLabel}
              </Link>
              <Link
                href="/contact"
                className="px-8 h-12 rounded-full border border-white/55 text-white text-[14px] font-semibold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center"
              >
                Book a Consultant
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
};

export default HomePage;
