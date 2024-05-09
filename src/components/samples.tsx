"use client";

import samples from "@/assets/samples.json";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { useConvert } from "@/hooks/use-convert";
import { useAtom } from "jotai";
import { controlsAtom } from "@/store/controls";
import { cn } from "@/lib/utils";

export function Samples() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-2 text-sm ml-auto">
        <span className="underline underline-offset-2">
          Try out these samples
        </span>
        <ChevronDownIcon
          className={cn("size-3", {
            "rotate-180": open,
            "rotate-0": !open,
          })}
        />
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <div className="grid gap-1">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Samples</h4>
            <p className="text-sm text-muted-foreground">
              Try out these samples.
            </p>
          </div>
          <div>
            {samples.map((value, i) => (
              <SampleButton
                value={value}
                key={i}
                onChange={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const SampleButton = ({
  value,
  onChange,
}: {
  value: string;
  onChange: () => void;
}) => {
  const [_, setControls] = useAtom(controlsAtom);
  const { convert } = useConvert();

  return (
    <Button
      variant={"link"}
      className="p-0"
      onClick={() => {
        setControls({
          error: null,
          inputValue: value,
        });
        convert(value);
        onChange();
      }}
    >
      {value}
    </Button>
  );
};
