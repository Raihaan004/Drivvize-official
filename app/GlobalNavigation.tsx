"use client";

import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HomeIcon } from "@/components/icons/home";
import { UsersIcon } from "@/components/icons/users";
import { CircleHelpIcon } from "@/components/icons/circle-help";
import { ArchiveIcon } from "@/components/icons/archive";
import { FileTextIcon } from "@/components/icons/file-text";
import { DownloadIcon } from "@/components/icons/download";
import { PartyPopperIcon } from "@/components/icons/party-popper";
import { MailCheckIcon } from "@/components/icons/mail-check";
import { ContactDialog } from "@/components/ContactDialog";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function GlobalNavigation() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pathname = usePathname();

  React.useLayoutEffect(() => {
    // If we're not on the landing page, reveal navigation immediately
    // On landing page, LandingPage.tsx handles the staged reveal after intro
    if (pathname !== "/") {
      gsap.to(".nav-pill", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(".nav-link", {
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, [pathname]);

  return (
    <>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 nav-pill opacity-0">
        <FloatingDock
          items={[
            {
              title: "Home",
              icon: <HomeIcon className={`h-full w-full ${pathname === "/" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/",
            },
            {
              title: "About Us",
              icon: <UsersIcon className={`h-full w-full ${pathname === "/about-us" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/about-us",
            },
            {
              title: "FAQs",
              icon: <CircleHelpIcon className={`h-full w-full ${pathname === "/faqs" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/faqs",
            },
            {
              title: "Services",
              icon: <ArchiveIcon className={`h-full w-full ${pathname === "/services" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/services",
            },
            {
              title: "Blog",
              icon: <FileTextIcon className={`h-full w-full ${pathname === "/blog" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/blog",
            },
            {
              title: "Downloads",
              icon: <DownloadIcon className={`h-full w-full ${pathname === "/downloads" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/downloads",
            },
            {
              title: "Careers",
              icon: <PartyPopperIcon className={`h-full w-full ${pathname === "/careers" ? "text-blue-400" : "text-zinc-400 group-hover:text-white"} transition-colors`} size="100%" />,
              href: "/careers",
            },
            {
              title: "Contact Us",
              icon: (
                <div className="h-full w-full bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white p-2 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <MailCheckIcon className="h-full w-full" size="100%" />
                </div>
              ),
              onClick: () => setIsContactOpen(true),
            },
          ]}
        />
      </div>

      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
