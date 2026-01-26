"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { MovingBorder } from "./moving-border";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-4 inset-x-0 flex flex-col gap-3 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.8,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="h-12 w-12 rounded-2xl backdrop-blur-lg border border-white/10 flex items-center justify-center shadow-2xl"
                >
                  <div className="h-6 w-6 text-zinc-400">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-2xl backdrop-blur-lg border border-white/10 flex items-center justify-center shadow-2xl"
      >
        <div className="h-6 w-6 text-zinc-400">
           {/* Hamburger icon */}
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </div>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <div className={cn("relative hidden md:block", className)}>
      {/* Moving Border Layer - Premium subtle edge glow */}
      <div className="absolute -inset-0.5 rounded-[1.75rem] overflow-hidden pointer-events-none opacity-50">
        <MovingBorder duration={4000} rx="1.75rem" ry="1.75rem">
          <div className="relative h-20 w-20">
            {/* Main Glow */}
            <div className="absolute inset-0 opacity-100 bg-[radial-gradient(#3b82f6_50%,transparent_70%)] blur-lg" />
            {/* Brighter Edge */}
            <div className="absolute inset-4 opacity-100 bg-white/20 blur-[1px] rounded-full" />
          </div>
        </MovingBorder>
      </div>

      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="relative mx-auto flex h-16 gap-3 items-end rounded-3xl backdrop-blur-2xl border border-white/10 px-4 pb-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]"
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);

  let widthIconTransform = useTransform(distance, [-150, 0, 150], [26, 38, 26]);
  let heightIconTransform = useTransform(distance, [-150, 0, 150], [26, 38, 26]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 100,
    damping: 18,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 100,
    damping: 18,
  });

  let widthIcon = useSpring(widthIconTransform, {
    mass: 0.1,
    stiffness: 100,
    damping: 18,
  });
  let heightIcon = useSpring(heightIconTransform, {
    mass: 0.1,
    stiffness: 100,
    damping: 18,
  });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl flex items-center justify-center transition-colors duration-500 hover:bg-white/5 group border border-white/5 hover:border-blue-500/40 overflow-visible"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 5, x: "-50%", scale: 0.9, filter: "blur(4px)" }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              filter: { duration: 0.2 }
            }}
            className="px-3 py-1.5 whitespace-pre rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-white/10 text-white absolute left-1/2 -top-12 w-fit text-[11px] font-bold uppercase tracking-[0.15em] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] pointer-events-none z-100"
          >
            <div className="flex items-center justify-center">
              {title}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-blue-500/10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        animate={hovered ? { scale: 1.2 } : { scale: 1 }}
      />

      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center relative z-10"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="nav-link cursor-pointer opacity-0">
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className="nav-link opacity-0">
      {content}
    </Link>
  );
}
