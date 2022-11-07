import { Edge } from "reactflow";
import AppModel from "src/data/models/AppModel";

export const setEdges = (
  edges: Edge[],
  flowName: string,
  appModel: AppModel
): void => {
  const flow = appModel.flows.find((f) => f.name === flowName);
  if (flow) flow.editorModel.edges = edges;
};
