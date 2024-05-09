import { atom } from "jotai";

interface Controls {
  inputValue: string;
  error: string | null;
}

const controlsAtom = atom<Controls>({ inputValue: "", error: null });

export { controlsAtom };
