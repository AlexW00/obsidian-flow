import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { useFlow } from "./useFlow";
import { Node } from "reactflow";

export const useNode = (
  nodeId: string,
  flowName?: string
): Node<CustomNodeData> | undefined => {
  return selectNode(nodeId, useFlow(flowName)?.editorModel);
};
