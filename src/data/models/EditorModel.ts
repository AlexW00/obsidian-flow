import { Edge, Node } from "reactflow";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
type EditorModel = {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
};
export default EditorModel;
