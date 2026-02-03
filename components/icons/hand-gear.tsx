"use client";

import { motion, useAnimation, type Variants, type SVGMotionProps } from "framer-motion";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface HandGearIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HandGearIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number | string;
}

const gearVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const handVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HandGearIcon = forwardRef<HandGearIconHandle, HandGearIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "cursor-pointer select-none transition-colors duration-200",
          className
        )}
        {...props}
      >
          {/* Gear */}
          <motion.g
            variants={gearVariants}
            animate={controls}
            style={{ originX: "12px", originY: "8px" }}
          >
            <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M12 2v3" />
            <path d="M12 11v3" />
            <path d="M16.5 3.5 15 6" />
            <path d="M9 10 7.5 12.5" />
            <path d="M18.5 8H21" />
            <path d="M3 8h2.5" />
            <path d="M16.5 12.5 15 10" />
            <path d="M9 6 7.5 3.5" />
          </motion.g>
          
          {/* Hand */}
          <motion.path
            d="M2 13c0 3 3 6 10 6s10-3 10-6"
            variants={handVariants}
            animate={controls}
          />
          <motion.path
            d="M5 10c-1.5 0-3 1.5-3 3s1.5 3 3 3"
            variants={handVariants}
            animate={controls}
          />
          <motion.path
            d="M19 10c1.5 0 3 1.5 3 3s-1.5 3-3 3"
            variants={handVariants}
            animate={controls}
          />
        </svg>
    );
  }
);

HandGearIcon.displayName = "HandGearIcon";

export { HandGearIcon };
