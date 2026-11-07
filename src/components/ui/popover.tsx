"use client";

/**
 * Popover UI wrapper around @base-ui/react Popover.
 * Styled to match the application design system.
 *
 * Usage:
 *   <Popover.Root>
 *     <Popover.Trigger render={<Button />}>Label</Popover.Trigger>
 *     <Popover.Content>…</Popover.Content>
 *   </Popover.Root>
 */

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

const Root = PopoverPrimitive.Root;

function Trigger({
  className,
  ...props
}: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function Content({
  className,
  align = "start",
  sideOffset = 6,
  children,
  ...props
}: PopoverPrimitive.Popup.Props & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side="bottom"
        align={align}
        sideOffset={sideOffset}
        className="z-[9500] outline-none"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            // base
            "min-w-[200px] rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-lg outline-none",
            // animation driven by Base UI data attributes
            "transition-[opacity,scale,translate] duration-150 ease-out",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function Close({ className, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(className)}
      {...props}
    />
  );
}

export const Popover = { Root, Trigger, Content, Close };
