"use client";

import { motion, useAnimation, type Variants, type SVGMotionProps } from "framer-motion";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BriefcaseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BriefcaseIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number | string;
}

const suitcaseVariants: Variants = {
  normal: { opacity: 1, y: 0 },
  animate: {
    y: [0, -2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const handleVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: -1,
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const BriefcaseIcon = forwardRef<BriefcaseIconHandle, BriefcaseIconProps>(
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
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <motion.rect
            width="20"
            height="14"
            x="2"
            y="6"
            rx="2"
            variants={suitcaseVariants}
            animate={controls}
          />
          <motion.path
            d="M12 11h.01"
            variants={handleVariants}
            animate={controls}
          />
        </svg>
    );
  }
);

BriefcaseIcon.displayName = "BriefcaseIcon";

export { BriefcaseIcon };
