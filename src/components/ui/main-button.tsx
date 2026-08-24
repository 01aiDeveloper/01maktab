import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const mainButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-[450] transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50",
  {
    variants: {
      variant: {
        gradient:
          "bg-gradient-to-r from-[#2A51E6] to-[#4469F6] text-white hover:from-[#1f3fc4] hover:to-[#3658e0] shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-[0.98]",
        white:
          "bg-white text-black border border-black/10 hover:bg-gray-50 hover:scale-105 active:scale-[0.98] shadow-sm",
        black:
          "bg-[#121212] text-white border border-black/20 hover:bg-[#1a1a1a] hover:scale-105 active:scale-[0.98] shadow-lg",
        outline:
          "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white hover:scale-105 active:scale-[0.98]",
        "outline-white":
          "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black hover:scale-105 active:scale-[0.98]",
      },
      size: {
        default: "h-[44px] px-4 py-[10px] text-base", // height: 44px, padding: 10px top/bottom, 16px left/right
        sm: "h-10 px-3 py-2 text-sm",
        md: "h-[48px] px-6 py-3 text-base",
        lg: "h-[44px] md:h-[54px] lg:h-[76px] px-4 md:px-8 lg:px-16 py-[10px] md:py-[15px] text-base md:text-[20px]", // Responsive height va padding
        icon: "h-[44px] w-[44px] md:h-[54px] md:w-[54px] p-0",
      },
      hasIcon: {
        true: "gap-[39px]",
        false: "gap-0",
      },
    },
    defaultVariants: {
      variant: "gradient",
      size: "default",
      hasIcon: false,
    },
  }
);

export interface MainButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href">,
    VariantProps<typeof mainButtonVariants> {
  asChild?: boolean;
  /**
   * Icon component (e.g., ArrowRight from lucide-react)
   */
  icon?: React.ReactNode;
  /**
   * Show loading spinner
   */
  loading?: boolean;
  /**
   * Icon position
   */
  iconPosition?: "left" | "right";
  /**
   * Link href - if provided, button will render as Next.js Link
   */
  href?: string;
  /**
   * Link target (e.g., "_blank" for external links)
   */
  target?: string;
  /**
   * Link rel attribute
   */
  rel?: string;
}

export const MainButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MainButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      loading = false,
      iconPosition = "right",
      disabled,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const hasIcon = !!icon && !loading;
    const buttonClassName = cn(
      mainButtonVariants({
        variant,
        size,
        hasIcon,
        className,
      })
    );

    const content = (
      <>
        {loading && (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        )}
        {!loading && iconPosition === "left" && icon && (
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            {icon}
          </span>
        )}
        {children && <span>{children}</span>}
        {!loading && iconPosition === "right" && icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            {icon}
          </span>
        )}
      </>
    );

    // If href is provided, render as Link
    if (href) {
      if (asChild) {
        return (
          <Slot ref={ref as any} className={buttonClassName} {...props}>
            {content}
          </Slot>
        );
      }
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={buttonClassName}
          ref={ref as any}
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }

    // Otherwise render as button
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonClassName}
        ref={ref as any}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

MainButton.displayName = "MainButton";

export { mainButtonVariants };

