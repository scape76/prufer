"use client";

import { Tree } from "react-d3-tree";
import { treeAtom } from "@/store/tree";
import { useAtom } from "jotai";
import sample from "@/assets/tree-sample.json";
import { useControlledTree } from "@/hooks/use-controlled-tree";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export function DataTree() {
  const [render, setRender] = useState(false);
  const [tree] = useAtom(treeAtom);

  const {
    containerRef,
    translate,
    setTranslate,
    centerize,
    zoom,
    setZoom,
    node,
    setNode,
  } = useControlledTree();

  const treeToShow = Object.keys(tree).length === 0 ? sample : tree;

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <div
      className="h-[calc(100vh-270px)] border mt-6 relative rounded-md"
      ref={containerRef}
    >
      {/* dragging sometimes doesn't work on initial render */}
      {render && (
        <Tree
          orientation="vertical"
          svgClassName="dark:bg-accent"
          leafNodeClassName="bg-white text-white"
          branchNodeClassName="bg-white text-white"
          onUpdate={(target) => {
            setTranslate(target.translate);
            setZoom(target.zoom);
            setNode(node);
          }}
          zoom={zoom}
          dataKey={JSON.stringify(treeToShow)}
          translate={translate}
          data={treeToShow}
          draggable
        />
      )}
      <Button
        className="absolute top-0 right-0"
        size={"icon"}
        variant={"outline"}
        onClick={() => {
          centerize();
        }}
      >
        <Icons.center className="size-5" />
      </Button>
    </div>
  );
}
