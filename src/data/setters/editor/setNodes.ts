import AppModel from "src/data/models/AppModel";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "reactflow";
import { deleteEdge } from "./deleteEdge";

export const setNodes = (
  newNodes: Node<CustomNodeData>[],
  flowName: string,
  appModel: AppModel
): void => {
  const flow = appModel.flows.find((f) => f.name === flowName);
  if (flow) {
    console.log(
      "setNodes from",
      flow.editorModel.nodes.map((n) => JSON.stringify(n)),
      "to",
      newNodes
    );
    const oldNodes = flow.editorModel.nodes;
    flow.editorModel.nodes = newNodes;

    const removedNodes = oldNodes.filter(
      (oldNode) => !newNodes.find((newNode) => newNode.id === oldNode.id)
    );

    console.log("removedNodes", removedNodes);
    removedNodes.forEach((removedNode) => {
      flow.editorModel.edges
        .filter(
          (edge) =>
            edge.source === removedNode.id || edge.target === removedNode.id
        )
        .forEach((edge) => deleteEdge(edge, flow.editorModel));
    });
  }
};
