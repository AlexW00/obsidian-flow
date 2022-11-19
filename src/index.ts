import { Plugin } from "obsidian";
import FlowLeaf from "./components/pages/FlowLeaf";

export default class ReactStarterPlugin extends Plugin {
  async onload(): Promise<void> {
    // This creates an icon in the left ribbon.
    this.addRibbonIcon("dice", "Sample Plugin", () => {
      const leaf = this.app.workspace.getLeaf();
      if (leaf) {
        const view = new FlowLeaf(leaf);
        leaf.open(view);
        console.log("Leaf opened");
      }
    });
  }
}
