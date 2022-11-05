import { Edge, Node } from "reactflow";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Inputs } from "src/classes/nodes/outputs/Inputs";

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

export const findConnectedNodes = (
	id: string,
	isTarget: boolean,
	handleId: string,
	editorModel: EditorModel
): { node: Node<CustomNodeData>; connectedOn: string }[] => {
	return (
		editorModel.edges
			// find all edges connected to the handle
			.filter((e) =>
				isTarget
					? e.target === id && e.targetHandle === handleId
					: e.source === id && e.sourceHandle === handleId
			)
			// get the nodes connected to the edges
			.map((e) => {
				return {
					node: findNode(isTarget ? e.source : e.target, editorModel),
					connectedOn: isTarget ? e.sourceHandle : e.targetHandle,
				};
			})
			// filter out undefined nodes
			.filter((r) => r.node !== undefined)
	);
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
	const node = findNode(nodeId, editorModel);
	if (node) return node.data.inputs;
	else return {};
};

export default EditorModel;
