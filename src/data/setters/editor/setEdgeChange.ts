import { applyEdgeChanges, EdgeChange } from "reactflow";
import AppModel from "src/data/models/AppModel";

export const setEdgeChange = (
  changes: EdgeChange[],
  flowName: string,
  appModel: AppModel
): void => {
  const flow = appModel.flows.find((f) => f.name === flowName);
  if (flow)
    flow.editorModel.edges = applyEdgeChanges(changes, flow.editorModel.edges);
};
