import { atom } from "jotai";
import { Tree } from "@/types";

const treeAtom = atom<Tree>([]);

export { treeAtom };
