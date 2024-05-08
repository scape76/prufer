"use client";

import { Tree, TreeProps } from "react-d3-tree";
import { treeAtom } from "@/store/tree";
import { useAtom } from "jotai";
import sample from "@/assets/sample.json";
import { useCenteredTree } from "@/hooks/use-centered-tree";

export function DataTree() {
  const [tree] = useAtom(treeAtom);
  const [translate, containerRef] = useCenteredTree();

  const treeToShow = Object.keys(tree).length === 0 ? sample : tree;

  return (
    <div className="h-[calc(100vh-250px)] border mt-6" ref={containerRef}>
      <Tree
        orientation="vertical"
        svgClassName="dark:bg-accent"
        leafNodeClassName="bg-white text-white"
        branchNodeClassName="bg-white text-white"
        dataKey={JSON.stringify(treeToShow)}
        translate={translate}
        data={treeToShow}
      />
    </div>
  );
}
