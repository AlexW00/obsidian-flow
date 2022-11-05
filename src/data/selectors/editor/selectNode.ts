import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import EditorModel from "src/data/models/EditorModel";
import { Node } from "reactflow";

export const selectNode = (
  id: string,
  editorModel: EditorModel
): Node<CustomNodeData> | undefined => {
  return editorModel.nodes.find((n) => n.id === id);
};
