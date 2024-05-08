import { useCallback, useState } from "react";

const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);

  const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();

      setTranslate({ x: width / 2, y: height / 4 });
    }
  }, []);

  return [translate, containerRef] as const;
};

export { useCenteredTree };
