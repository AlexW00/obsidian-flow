import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "reactflow";

export const selectNode = (
  id: string,
  nodes: Node<CustomNodeData>[]
): Node<CustomNodeData> | undefined => {
  return nodes.find((n) => n.id === id);
};
