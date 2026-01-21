"use client";

import { motion, useAnimation, type Variants } from "framer-motion";
import type { SVGAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PartyPopperIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PartyPopperIconProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const LINES_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
  },
  animate: {
    opacity: [0, 1],
    scale: [0.3, 0.8, 1, 1.1, 1],
    pathLength: [0, 0.5, 1],
    translateX: [-5, 0],
    translateY: [5, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const POPPER_VARIANTS: Variants = {
  normal: { rotate: 0, translateX: 0, translateY: 0 },
  animate: {
    rotate: [0, -5, 5, 0],
    translateX: [0, -1, 1, 0],
    translateY: [0, 1, -1, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const PartyPopperIcon = forwardRef<PartyPopperIconHandle, PartyPopperIconProps>(
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
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <motion.svg
        className={cn("cursor-pointer select-none transition-colors duration-200", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <motion.path
          animate={controls}
          d="M5.8 11.3 2 22l10.7-3.79"
          variants={POPPER_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
          variants={POPPER_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M13 8l2-2"
          variants={LINES_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M16 11l2-2"
          variants={LINES_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="m16 19 2 2 4-4"
          variants={LINES_VARIANTS}
        />
      </motion.svg>
    );
  }
);

PartyPopperIcon.displayName = "PartyPopperIcon";

export { PartyPopperIcon };
