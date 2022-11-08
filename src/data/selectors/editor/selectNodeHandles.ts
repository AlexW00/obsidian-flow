import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "../app/selectFlow";
import { selectNode } from "./selectNode";

export const selectNodeHandles = (
  isInput: boolean,
  nodeId: string,
  flowName: string,
  appModel: AppModel
): NodeHandles => {
  const nodes = selectFlow(flowName, appModel)?.editorModel.nodes;
  const node = selectNode(nodeId, nodes);
  const definition = node?.data?.definition;
  const handles = isInput ? definition?.io?.inputs : definition?.io?.outputs;
  return handles;
};
