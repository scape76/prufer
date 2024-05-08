import * as z from "zod";

export const sequenceSchema = z
  .string()
  .regex(/^\d+(,\d+)*$/, {
    message: "Invalid sequence format. Please provide comma-separated numbers.",
  })
  .refine(
    (val) => {
      const sequence = val.split(",").map(Number);
      const nodes = sequence.length + 2;

      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] < 1 || sequence[i] > nodes) {
          return false;
        }
      }

      return true;
    },
    { message: "Invalid prufer sequence" }
  );
