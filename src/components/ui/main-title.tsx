import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MainTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Text color variant
   * @default "foreground"
   */
  color?: "foreground" | "muted" | "primary" | "white" | "black" | string;
  /**
   * Font size variant
   * @default "2xl"
   */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  /**
   * Font weight
   * @default "bold"
   */
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  /**
   * Text alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Letter spacing
   * @default "normal"
   */
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  /**
   * Custom text color (hex, rgb, etc.)
   */
  textColor?: string;
  /**
   * Enable animation on scroll
   * @default false
   */
  animated?: boolean;
  /**
   * Animation delay in seconds
   * @default 0
   */
  animationDelay?: number;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
  "2xl": "text-4xl",
  "3xl": "text-5xl",
  "4xl": "text-6xl",
  "5xl": "text-7xl",
  "6xl": "text-8xl",
  "7xl": "text-9xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const letterSpacingClasses = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};

const colorClasses = {
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  white: "text-white",
  black: "text-black",
  "text-dark": "text-text-dark",
  "text-gray": "text-text-gray",
  "primary-blue": "text-primary-blue",
};

export function MainTitle({
  children,
  className,
  color = "text-dark",
  size = "2xl",
  weight = "bold",
  align = "left",
  letterSpacing = "normal",
  textColor,
  animated = false,
  animationDelay = 0,
  ...props
}: MainTitleProps) {
  const colorClass = textColor
    ? undefined
    : colorClasses[color as keyof typeof colorClasses] || colorClasses.foreground;

  const baseClassName = cn(
    // Responsive font sizes: mobile 36px, tablet 48px, desktop 64px
    "text-[36px] leading-[1.2] sm:text-[48px] md:text-[56px] lg:text-[64px] lg:leading-[81px]",
    // Font weight: 600 (Semibold)
    "font-semibold",
    // Letter spacing: -5%
    "tracking-[-0.05em]",
    // Text transform: capitalize
    "capitalize",
    // Default alignment
    alignClasses[align],
    colorClass,
    className
  );

  const baseStyle = textColor ? { color: textColor } : undefined;

  if (animated) {
    return (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: animationDelay }}
        className={baseClassName}
        style={{ ...baseStyle, ...props.style }}
      >
        {children}
      </motion.h2>
    );
  }

  return (
    <h2
      className={baseClassName}
      style={{ ...baseStyle, ...props.style }}
      {...props}
    >
      {children}
    </h2>
  );
}

