"use client";

import React, { useState, useMemo } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";
import { defaultNewsletterData } from "./newsletterData";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "hi") return "hi";
    return "en";
  }, [pathname]);

  const getCurrentSection = useMemo(() => {
    if (!currentPages) return;
    return currentPages.content?.find((page: any) => page.adminTitle === "Newsletter Section");
  }, [currentPages]);

  const p = (getCurrentSection as any)?.props || defaultNewsletterData.props;
 
  const badge = p.badge?.[lang] || p.badge?.en || p.badge || "";
  const title = p.title?.[lang] || p.title?.en || p.title || "";
  const description = p.description?.[lang] || p.description?.en || p.description || "";
  const joinTitle = p.joinTitle?.[lang] || p.joinTitle?.en || p.joinTitle || "";
  const joinSub = p.joinSub?.[lang] || p.joinSub?.en || p.joinSub || "";
  const emailPlaceholder = p.emailPlaceholder?.[lang] || p.emailPlaceholder?.en || p.emailPlaceholder || "";
  const buttonLabel = p.buttonLabel?.[lang] || p.buttonLabel?.en || p.buttonLabel || "";
  const msgSuccess = p.msgSuccess?.[lang] || p.msgSuccess?.en || p.msgSuccess || "";
  
  const feature1 = p.feature1?.[lang] || p.feature1?.en || p.feature1 || "";
  const feature2 = p.feature2?.[lang] || p.feature2?.en || p.feature2 || "";
  const feature3 = p.feature3?.[lang] || p.feature3?.en || p.feature3 || "";
  
  const noSpam = p.noSpam?.[lang] || p.noSpam?.en || p.noSpam || "";
  const unsubscribe = p.unsubscribe?.[lang] || p.unsubscribe?.en || p.unsubscribe || "";
  const updates = p.updates?.[lang] || p.updates?.en || p.updates || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(msgSuccess);
    setEmail("");
  };

  return (
    <section
      data-annotate-id="home-newsletter-section"
      className="relative overflow-hidden border-y border-white/10 bg-[#0E6E35] px-[5%] py-[90px] text-white lg:py-[110px]"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] h-[320px] w-[320px] rounded-full bg-[#B8D35A]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left content */}
          <div className="max-w-[760px]">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2">
              <span className="text-[12px] font-extrabold uppercase tracking-[3px] text-[#B8D35A]">
                {badge}
              </span>
            </div>

            <h3 className="max-w-[760px] font-heading text-[42px] font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[74px]">
              {title}
            </h3>

            <p className="mt-6 max-w-[620px] text-[18px] font-medium leading-8 text-white/80 sm:text-[20px]">
              {description}
            </p>

            <div className="mt-10 hidden items-center gap-8 text-white/65 lg:flex">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B8D35A]" />
                <span className="text-[14px] font-semibold">
                  {feature1}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B8D35A]" />
                <span className="text-[14px] font-semibold">{feature2}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B8D35A]" />
                <span className="text-[14px] font-semibold">
                  {feature3}
                </span>
              </div>
            </div>
          </div>

          {/* right form card */}
          <div className="lg:justify-self-end">
            <div className="w-full max-w-[540px] rounded-[12px] border border-white/12 bg-white/10 p-4  sm:p-5">
              <div className="mb-4">
                <p className="text-[18px] font-semibold text-white/85">
                  {joinTitle}
                </p>
                <p className="mt-1 text-[13px] leading-6 text-white/80">
                  {joinSub}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <input
                    className="py-4 w-full rounded-full border border-white/15 bg-white px-5 text-[16px] font-medium text-black outline-none transition placeholder:text-black/45 focus:border-[#B8D35A] focus:ring-2 focus:ring-[#B8D35A]/30"
                    type="email"
                    placeholder={emailPlaceholder}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  className="inline-flex py-4 items-center justify-center rounded-full bg-[#B8D35A] px-7 text-[14px] font-extrabold uppercase tracking-[0.14em] text-[#14351F] transition hover:translate-y-[-1px] hover:bg-[#c7df72]"
                  type="submit"
                >
                  {buttonLabel}
                </button>
              </form>

              {msg && (
                <p className="mt-3 text-[13px] font-medium text-white/75">
                  {msg}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-white/55">
                <span>{noSpam}</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
                <span>{unsubscribe}</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
                <span>{updates}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
