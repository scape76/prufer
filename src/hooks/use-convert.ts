import { Prufer } from "@/lib/prufer";
import { getErrorMessage } from "@/lib/utils";
import { sequenceSchema } from "@/lib/validations/sequence";
import { controlsAtom } from "@/store/controls";
import { treeAtom } from "@/store/tree";
import { useAtom } from "jotai";
import { useCallback } from "react";

export function useConvert() {
  const [_c, setControls] = useAtom(controlsAtom);
  const [_, setTree] = useAtom(treeAtom);

  const convert = useCallback((value: string) => {
    try {
      const validated = sequenceSchema.parse(value);

      const sequence = validated.split(",").map(Number);

      const prufer = new Prufer(sequence);

      prufer.convert();

      setTree(prufer.getTree());
    } catch (err) {
      setControls((prev) => ({ ...prev, error: getErrorMessage(err) }));
    }
  }, []);

  return { convert };
}
