import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Text color variant
   * @default "muted"
   */
  color?: "foreground" | "muted" | "primary" | "white" | "black" | "secondary" | string;
  /**
   * Font size variant
   * @default "lg"
   */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Font weight
   * @default "normal"
   */
  weight?: "normal" | "medium" | "semibold" | "bold";
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
   * Line height
   * @default "relaxed"
   */
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
  /**
   * Custom text color (hex, rgb, etc.)
   */
  textColor?: string;
  /**
   * Maximum width for the subtitle
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
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
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
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

const lineHeightClasses = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
  none: "max-w-none",
};

const colorClasses = {
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  white: "text-white",
  black: "text-black",
  secondary: "text-secondary",
  "text-dark": "text-text-dark",
  "text-gray": "text-text-gray",
  "primary-blue": "text-primary-blue",
};

export function Subtitle({
  children,
  className,
  color = "muted",
  size = "lg",
  weight = "normal",
  align = "left",
  letterSpacing = "normal",
  lineHeight = "relaxed",
  maxWidth,
  textColor,
  animated = false,
  animationDelay = 0,
  ...props
}: SubtitleProps) {
  const colorClass = textColor
    ? undefined
    : colorClasses[color as keyof typeof colorClasses] || colorClasses.muted;

  const baseClassName = cn(
    "block",
    // Responsive font sizes: mobile 16px, desktop 20px
    "text-[16px] md:text-[20px]",
    // Responsive line heights: mobile 21px, desktop 25px
    "leading-[21px] md:leading-[25px]",
    // Font family: Suisse Intl
    "font-['Suisse_Intl',sans-serif]",
    // Font weight: 450 (Book)
    "font-[450]",
    // Letter spacing: -5%
    "tracking-[-0.05em]",
    // Default alignment
    alignClasses[align],
    maxWidth && maxWidthClasses[maxWidth],
    colorClass,
    className
  );

  const baseStyle = textColor ? { color: textColor } : undefined;

  // Extract non-conflicting props for motion component
  const { onAnimationStart, onDrag, onDragStart, onDragEnd, ...restProps } = props as any;

  if (animated) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: animationDelay }}
        className={baseClassName}
        style={{ ...baseStyle, ...restProps.style }}
      >
        {children}
      </motion.p>
    );
  }

  return (
    <p
      className={baseClassName}
      style={{ ...baseStyle, ...restProps.style }}
      {...restProps}
    >
      {children}
    </p>
  );
}

