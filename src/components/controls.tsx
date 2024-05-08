"use client";

import * as React from "react";

import { useAtom, useSetAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { treeAtom } from "@/store/tree";
import { sequenceSchema } from "@/lib/validations/sequence";
import { cn, getErrorMessage } from "@/lib/utils";
import { Prufer } from "@/lib/prufer";

export function Controls() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const [_, setTree] = useAtom(treeAtom);

  const handleClick = () => {
    try {
      const validated = sequenceSchema.parse(value);

      const sequence = validated.split(",").map(Number);

      const prufer = new Prufer(sequence);

      prufer.convert();

      console.log(prufer.getTree());

      setTree(prufer.getTree());
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col-reverse sm:flex-col gap-2 w-full">
        <Input
          placeholder="2,3,4,4"
          value={value}
          onChange={(e) => {
            setError(null);
            setValue(e.target.value);
          }}
        />
        <p
          className={cn("text-[0.8rem] text-muted-foreground", {
            "text-destructive": !!error,
          })}
        >
          {!error
            ? "Provide a prufer sequence with labels separated by comma."
            : error}
        </p>
      </div>
      <Button onClick={handleClick}>Generate</Button>
    </div>
  );
}
