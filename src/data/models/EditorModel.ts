import { Edge, Node } from "react-flow-renderer";
import { CustomNodeData } from "../../classes/nodes/CustomNodeData";
type EditorModel = {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
};
export default EditorModel;
