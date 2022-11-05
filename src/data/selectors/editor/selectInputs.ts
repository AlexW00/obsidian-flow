import { Inputs } from "src/classes/nodes/outputs/Inputs";
import EditorModel from "src/data/models/EditorModel";
import { selectNode } from "./selectNode";

export const selectInputs = (
  nodeId: string,
  editorModel: EditorModel
): Inputs => {
  const node = selectNode(nodeId, editorModel);
  if (node) return node.data.inputs;
  else return {};
};
