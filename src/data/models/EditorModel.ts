import { Edge, Node } from "reactflow";
import {
	NodeIO,
	CustomNodeData,
	Inputs,
} from "src/components/ui/molecules/nodes/CustomNode";

type EditorModel = {
	nodes: Node<CustomNodeData>[];
	edges: Edge[];
};

export const findNode = (
	id: string,
	editorModel: EditorModel
): Node<CustomNodeData> | undefined => {
	return editorModel.nodes.find((n) => n.id === id);
};

export const findNodeIndex = (id: string, editorModel: EditorModel): number => {
	return editorModel.nodes.findIndex((n) => n.id === id);
};

export const findEdge = (
	id: string,
	editorModel: EditorModel
): Edge | undefined => {
	return editorModel.edges.find((e) => e.id === id);
};

export const findEdgeIndex = (id: string, editorModel: EditorModel): number => {
	return editorModel.edges.findIndex((e) => e.id === id);
};

export const getInputs = (nodeId: string, editorModel: EditorModel): Inputs => {
	const inputDefinition: NodeIO =
		findNode(nodeId, editorModel)?.data?.definition?.io?.inputs ?? {};

	const edges = editorModel.edges.filter((e) => e.target === nodeId);
	const connectedNodes: Map<string, Node<CustomNodeData>> = new Map();
	edges
		.filter((e, i, a) => a.findIndex((e2) => e2.source === e.source) === i)
		.map((e) => findNode(e.source, editorModel))
		.forEach((n) => {
			if (n) connectedNodes.set(n.id, n);
		});

	const inputs: Inputs = {};

	if (edges && connectedNodes) {
		for (const key of Object.keys(inputDefinition)) {
			const edge = edges.find((e) => e.targetHandle === key);
			const connectedNode = connectedNodes.get(edge?.source);
			inputs[key] = connectedNode?.data?.outputs?.[edge?.sourceHandle ?? ""];
		}
	}

	return inputs;
};

export default EditorModel;
