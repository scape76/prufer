import { DataTree } from "../components/data-tree";
import { Controls } from "../components/controls";
import { Samples } from "../components/samples";

export default function Home() {
  return (
    <main className="container max-w-3xl flex flex-col gap-2">
      <DataTree />
      <Controls />
      <Samples />
    </main>
  );
}
