import { Outputs } from "src/components/ui/molecules/nodes/CustomNode";
import EditorModel, { findNode } from "./EditorModel";

type FlowModel = {
	name: string;
	description: string;
	editorModel: EditorModel;
};

export const getOutputs = (
	flow: FlowModel,
	nodeId: string
): Outputs | undefined => {
	const node = findNode(nodeId, flow.editorModel);
	return node?.data?.outputs;
};

export default FlowModel;
