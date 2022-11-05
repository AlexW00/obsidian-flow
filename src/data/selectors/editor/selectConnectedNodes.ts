import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import EditorModel from "src/data/models/EditorModel";
import { Node } from "reactflow";
import { selectNode } from "./selectNode";

export const selectConnectedNodes = (
  id: string,
  isTarget: boolean,
  handleId: string,
  editorModel: EditorModel
): { node: Node<CustomNodeData>; connectedOn: string }[] => {
  return (
    editorModel.edges
      // find all edges connected to the handle
      .filter((e) =>
        isTarget
          ? e.target === id && e.targetHandle === handleId
          : e.source === id && e.sourceHandle === handleId
      )
      // get the nodes connected to the edges
      .map((e) => {
        return {
          node: selectNode(isTarget ? e.source : e.target, editorModel),
          connectedOn: isTarget ? e.sourceHandle : e.targetHandle,
        };
      })
      // filter out undefined nodes
      .filter((r) => r.node !== undefined)
  );
};
