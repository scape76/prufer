import { Sequence } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pruferToTree(sequence: Sequence) {
  const tLength = sequence.length + 2;

  const tree = new Map();

  for (let i = 1; i <= tLength; i++) {
    tree.set(i, null);
  }

  const degrees = new Map();

  for (let i = 1; i <= tLength; i++) {
    degrees.set(i, 1);
  }

  for (let val of sequence) {
    const prev = degrees.get(val);

    degrees.set(val, prev + 1);
  }

  for (let value of sequence) {
    for (let node of tree.keys()) {
      const currNodeDeg = degrees.get(node);
      const sequenceNodeDeg = degrees.get(value);

      if (currNodeDeg === 1) {
        tree.set(node, value);
        degrees.set(node, currNodeDeg - 1);
        degrees.set(value, sequenceNodeDeg - 1);
        break;
      }
    }
  }

  let u = 0;
  let v = 0;

  for (let node of tree.keys()) {
    if (degrees.get(node) === 1) {
      if (u === 0) {
        u = node;
      } else if (v === 0) {
        v = node;
      } else {
        break;
      }
    }
  }

  tree.set(u, v);

  return tree;
}

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return (
      err.errors[0]?.message ??
      "An unknown error occurred. Please try again later."
    );
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return "An unknown error occurred. Please try again later.";
  }
}
