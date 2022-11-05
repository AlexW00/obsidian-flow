import AppModel from "src/data/models/AppModel";

export const findFlowIndex = (name: string, app: AppModel): number => {
  return app.flows.findIndex((f) => f.name === name);
};
