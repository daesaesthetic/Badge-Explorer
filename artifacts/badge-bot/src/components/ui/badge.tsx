import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom rarity colors
        common: "border-transparent bg-gray-500/20 text-gray-300",
        uncommon: "border-transparent bg-[#57F287]/20 text-[#57F287]",
        rare: "border-transparent bg-[#3498DB]/20 text-[#3498DB]",
        very_rare: "border-transparent bg-[#9B59B6]/20 text-[#9B59B6]",
        legendary: "border-transparent bg-[#F1C40F]/20 text-[#F1C40F]",
        legacy: "border-transparent bg-[#ED4245]/20 text-[#ED4245]",
        // Custom difficulty colors
        instant: "border-transparent bg-[#57F287]/20 text-[#57F287]",
        easy: "border-transparent bg-[#1ABC9C]/20 text-[#1ABC9C]",
        medium: "border-transparent bg-[#FEE75C]/20 text-[#FEE75C]",
        hard: "border-transparent bg-[#ED4245]/20 text-[#ED4245]",
        unobtainable: "border-transparent bg-gray-500/20 text-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
