import FlowModel from "./FlowModel";

type AppModel = {
	flows: FlowModel[];
};

export const findFlow = (
	name: string,
	appModel: AppModel
): FlowModel | undefined => {
	return appModel.flows.find((f) => f.name === name);
};

export const findFlowIndex = (name: string, appModel: AppModel): number => {
	return appModel.flows.findIndex((f) => f.name === name);
};

export const setFlow = (flow: FlowModel, appModel: AppModel): void => {
	const flowIndex = findFlowIndex(flow.name, appModel);
	if (flowIndex !== -1) appModel.flows[flowIndex] = flow;
	else appModel.flows.push(flow);
};

export default AppModel;
