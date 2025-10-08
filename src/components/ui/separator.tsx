
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, children, ...props },
    ref
  ) => (
    <div className={cn(
        "flex items-center",
        orientation === "horizontal" ? "w-full" : "h-full flex-col",
        className
    )}
    >
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border flex-1",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        )}
        {...props}
      />
      {children && (
        <>
            {children}
             <SeparatorPrimitive.Root
                decorative={decorative}
                orientation={orientation}
                className={cn(
                "shrink-0 bg-border flex-1",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                )}
            />
        </>
      )}
    </div>
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
