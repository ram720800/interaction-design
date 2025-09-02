import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border border-[#3a3a3a] bg-gray4/30 flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "focus-visible:ring-foreground/50 focus-visible:ring-[0.5px]",
        "aria-invalid:ring-invalid/40 aria-invalid:border-invalid",
        className
      )}
      {...props}
    />
  )
}

export { Input }
