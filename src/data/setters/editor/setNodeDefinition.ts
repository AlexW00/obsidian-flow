import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectNode } from "src/data/selectors/editor/selectNode";

export const setNodeDefinition = (
  definition: CustomNodeDefinition,
  nodeId: string,
  flowName: string,
  appModel: AppModel
): void => {
  // update outputs
  const editorModel = selectFlow(flowName, appModel).editorModel;
  const node = selectNode(nodeId, editorModel.nodes);
  if (node) node.data.definition = definition;
};
