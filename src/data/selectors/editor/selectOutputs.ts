import { Outputs } from "src/classes/nodes/outputs/Outputs";
import EditorModel from "src/data/models/EditorModel";
import { selectNode } from "./selectNode";

export const selectOutputs = (
  nodeId: string,
  editor: EditorModel
): Outputs | undefined => {
  const node = selectNode(nodeId, editor.nodes);
  return node?.data?.outputs;
};
