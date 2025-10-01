import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-purple-600 text-white shadow hover:bg-purple-600/80",
        secondary: "border-transparent bg-blue-800 text-blue-200 hover:bg-blue-800/80",
        destructive: "border-transparent bg-red-600 text-white shadow hover:bg-red-600/80",
        outline: "text-slate-200 border-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = ({ className, variant, ...props }) => {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export default Badge