"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useConvert } from "@/hooks/use-convert";
import { useAtom } from "jotai";
import { controlsAtom } from "@/store/controls";

export function Controls() {
  const [controls, setControls] = useAtom(controlsAtom);
  const { convert } = useConvert();

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col-reverse sm:flex-col gap-2 w-full">
        <Input
          placeholder="4,4,4,5"
          value={controls.inputValue}
          onChange={(e) => {
            setControls({ error: null, inputValue: e.target.value });
          }}
        />
        <p
          className={cn("text-[0.8rem] text-muted-foreground", {
            "text-destructive": !!controls.error,
          })}
        >
          {!controls.error
            ? "Provide a prufer sequence with labels separated by comma."
            : controls.error}
        </p>
      </div>
      <Button onClick={() => convert(controls.inputValue)}>Convert</Button>
    </div>
  );
}
