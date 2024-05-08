import { Sequence, Tree } from "@/types";

export class Prufer {
  sequence: Sequence;
  tree: Tree;

  constructor(sequence: Sequence) {
    this.sequence = sequence;
    this.tree = [];
  }

  convert() {
    const tLength = this.sequence.length + 2;

    const tree = new Map();

    for (let i = 1; i <= tLength; i++) {
      tree.set(i, null);
    }

    const degrees = new Map();

    for (let i = 1; i <= tLength; i++) {
      degrees.set(i, 1);
    }

    for (let val of this.sequence) {
      const prev = degrees.get(val);

      degrees.set(val, prev + 1);
    }

    for (let value of this.sequence) {
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

    const t = this.toNodeDatum(tree);

    this.setTree(t);
  }

  toNodeDatum(mapTree: Map<number, number | null>): Tree {
    let topParent = 0;

    for (let node of mapTree.keys()) {
      if (mapTree.get(node) === null) {
        topParent = node;

        break;
      }
    }

    const children = this.selectChildren(topParent, mapTree);

    return { name: String(topParent), children };
  }

  selectChildren(parentKey: number, mapTree: Map<number, number | null>) {
    let currentParent = parentKey;

    const children: Tree = [];

    for (let node of mapTree.keys()) {
      if (mapTree.get(node) === currentParent) {
        children.push({
          name: String(node),
          children: this.selectChildren(node, mapTree),
        });
      }
    }

    return children;
  }

  setTree(tree: Tree) {
    this.tree = tree;
  }

  getTree() {
    return this.tree;
  }

  getSequence() {
    return this.sequence;
  }
}
