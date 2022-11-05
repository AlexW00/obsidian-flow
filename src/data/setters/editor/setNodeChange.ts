import { applyNodeChanges } from "reactflow";
import AppModel from "src/data/models/AppModel";
import { NodeChange } from "reactflow";

export const setNodeChange = (
  changes: NodeChange[],
  flowName: string,
  appModel: AppModel
): void => {
  const flow = appModel.flows.find((f) => f.name === flowName);
  if (flow) {
    flow.editorModel.nodes = applyNodeChanges(changes, flow.editorModel.nodes);
  }
};
