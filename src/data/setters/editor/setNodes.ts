import AppModel from "src/data/models/AppModel";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "reactflow";

export const setNodes = (
  newNodes: Node<CustomNodeData>[],
  flowName: string,
  appModel: AppModel
): void => {
  const flow = appModel.flows.find((f) => f.name === flowName);
  if (flow) {
    flow.editorModel.nodes = newNodes;
  }
};
