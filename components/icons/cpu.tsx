"use client";

import { motion, useAnimation, type Variants, type SVGMotionProps } from "framer-motion";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CpuIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CpuIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number | string;
}

const rectVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const lineVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const CpuIcon = forwardRef<CpuIconHandle, CpuIconProps>(
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
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          (onMouseEnter as any)?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          (onMouseLeave as any)?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(
          "cursor-pointer select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <motion.rect
            width="16"
            height="16"
            x="4"
            y="4"
            rx="2"
            variants={rectVariants}
            animate={controls}
          />
          <motion.rect
            width="6"
            height="6"
            x="9"
            y="9"
            rx="1"
            variants={rectVariants}
            animate={controls}
          />
          <motion.path
            d="M15 2v2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M15 20v2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M2 15h2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M2 9h2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M20 15h2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M20 9h2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M9 2v2"
            variants={lineVariants}
            animate={controls}
          />
          <motion.path
            d="M9 20v2"
            variants={lineVariants}
            animate={controls}
          />
        </motion.svg>
      </div>
    );
  }
);

CpuIcon.displayName = "CpuIcon";

export { CpuIcon };
