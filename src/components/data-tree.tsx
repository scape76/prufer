"use client";

import { Tree, TreeProps } from "react-d3-tree";
import { treeAtom } from "@/store/tree";
import { useAtom } from "jotai";
import sample from "@/assets/sample.json";
import { useCenteredTree } from "@/hooks/use-centered-tree";
import { useEffect, useState } from "react";

export function DataTree() {
  const [render, setRender] = useState(false);
  const [tree] = useAtom(treeAtom);
  const [translate, containerRef] = useCenteredTree();

  const treeToShow = Object.keys(tree).length === 0 ? sample : tree;

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <div className="h-[calc(100vh-250px)] border mt-6" ref={containerRef}>
      {/* dragging sometimes doesn't work on initial render */}
      {render && (
        <Tree
          orientation="vertical"
          svgClassName="dark:bg-accent"
          leafNodeClassName="bg-white text-white"
          branchNodeClassName="bg-white text-white"
          dataKey={JSON.stringify(treeToShow)}
          translate={translate}
          data={treeToShow}
          draggable
        />
      )}
    </div>
  );
}
