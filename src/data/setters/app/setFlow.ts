import AppModel from "src/data/models/AppModel";
import FlowModel from "src/data/models/FlowModel";
import { findFlowIndex } from "src/data/selectors/app/findFlowIndex";

export const setFlow = (flow: FlowModel, appModel: AppModel) => {
  const flowIndex = findFlowIndex(flow.name, appModel);
  if (flowIndex !== -1) appModel.flows[flowIndex] = flow;
  else appModel.flows.push(flow);
};
