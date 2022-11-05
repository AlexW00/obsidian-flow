import { addEdge, Connection } from "reactflow";
import AppModel from "src/data/models/AppModel";

export const setConnection = (
  connection: Connection,
  flowName: string,
  appModel: AppModel
): void => {
  const flow = appModel.flows.find((f) => f.name === flowName);
  if (flow) {
    flow.editorModel.edges = addEdge(connection, flow.editorModel.edges);
  }
};
