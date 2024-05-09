import * as React from "react";
import type { TreeNodeDatum, TreeProps } from "react-d3-tree";

interface DefaultValues extends Pick<TreeProps, "translate" | "zoom"> {}

const useControlledTree = (
  defaultVals: DefaultValues = { translate: { x: 0, y: 0 }, zoom: 0.8 }
) => {
  const [node, setNode] = React.useState<TreeNodeDatum | null>(null);
  const [translate, setTranslate] = React.useState(defaultVals.translate);
  const [zoom, setZoom] = React.useState(defaultVals.zoom);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      centerize();
    }
  }, [containerRef.current]);

  const centerize = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      setTranslate({ x: width / 2, y: height / 4 });
      setZoom(0.8);
    }
  };

  return {
    containerRef,
    translate,
    setTranslate,
    centerize,
    zoom,
    setZoom,
    node,
    setNode,
  };
};

export { useControlledTree };
