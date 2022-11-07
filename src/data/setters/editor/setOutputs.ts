import { Outputs } from "src/classes/nodes/outputs/Outputs";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectConnectedNodes } from "src/data/selectors/editor/selectConnectedNodes";
import { selectNode } from "src/data/selectors/editor/selectNode";

export const setOutputs = (
  outputs: Outputs,
  nodeId: string,
  flowName: string,
  appModel: AppModel
): void => {
  // update outputs
  const editorModel = selectFlow(flowName, appModel).editorModel;
  const node = selectNode(nodeId, editorModel.nodes);
  if (node) node.data.outputs = outputs;

  // update inputs
  Object.keys(outputs).forEach((outputId) => {
    const connectedNodes = selectConnectedNodes(
      nodeId,
      false,
      outputId,
      editorModel
    );
    const output = outputs[outputId];

    connectedNodes.forEach((connectedNode) => {
      connectedNode.node.data.inputs[connectedNode.connectedOn] = output;
    });
  });
};
