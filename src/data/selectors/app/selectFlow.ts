import AppModel from "src/data/models/AppModel";
import FlowModel from "src/data/models/FlowModel";

export const selectFlow = (
  name: string,
  appModel: AppModel
): FlowModel | undefined => {
  console.log("selectFlow", name);
  return appModel.flows.find((f) => f.name === name);
};
