import create from "zustand";
// import { persist } from "zustand/middleware";
import {
	NodeChange,
	EdgeChange,
	Connection,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	Node,
} from "reactflow";

import produce from "immer";

import appModel from "./example/appModel";
import AppModel, { findFlow, setFlow } from "./models/AppModel";
import FlowModel, { getOutputs } from "./models/FlowModel";
import { findConnectedNodes, findNode, getInputs } from "./models/EditorModel";
import { Inputs } from "src/classes/nodes/outputs/Inputs";
import { OutputData, Outputs } from "src/classes/nodes/outputs/Outputs";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";

interface AppStore extends AppModel {
	// Flows
	setFlow(flow: FlowModel): void;
	getFlow(name: string): FlowModel | undefined;

	// Editor
	onNodesChange(flowName: string, changes: NodeChange[]): void;
	getOnNodesChange(flowName: string): (changes: NodeChange[]) => void;

	onEdgesChange(flowName: string, changes: EdgeChange[]): void;
	getOnEdgesChange(flowName: string): (changes: EdgeChange[]) => void;

	onConnect(flowName: string, connection: Connection): void;
	getOnConnect(flowName: string): (connection: Connection) => void;

	getEditorCallbacks(flowName: string): {
		onNodesChange: (changes: NodeChange[]) => void;
		onEdgesChange: (changes: EdgeChange[]) => void;
		onConnect: (connection: Connection) => void;
	};

	// Node IO
	getInputs(flowName: string, nodeId: string): Inputs;
	getOutputs(flowName: string, nodeId: string): Outputs | undefined;

	getInput(flowName: string, nodeId: string, inputName: string): OutputData;
	getOutput(
		flowName: string,
		nodeId: string,
		outputName: string
	): OutputData | undefined;

	setOutput: (
		flowName: string,
		nodeId: string,
		outputId: string,
		output: OutputData
	) => void;

	// Node

	findNode(flowName: string, nodeId: string): Node<CustomNodeData> | undefined;
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppStore>(
	// persist<AppStore>(
	(set, get) => ({
		flows: appModel.flows, // Example flow, TODO: Remove

		// Flows
		setFlow: (flow: FlowModel) =>
			set(produce((draft: AppStore) => setFlow(flow, draft))),
		getFlow: (name: string): FlowModel | undefined => findFlow(name, get()),

		// Editor
		onNodesChange: (flowName: string, changes: NodeChange[]) =>
			set(
				produce((draft: AppStore) => {
					const flow = draft.flows.find((f) => f.name === flowName);
					if (flow) {
						flow.editorModel.nodes = applyNodeChanges(
							changes,
							flow.editorModel.nodes
						);
					}
				})
			),
		getOnNodesChange: (flowName: string): ((changes: NodeChange[]) => void) => {
			return (changes: NodeChange[]) => {
				get().onNodesChange(flowName, changes);
			};
		},

		onEdgesChange: (flowName: string, changes: EdgeChange[]) =>
			set(
				produce((draft: AppStore) => {
					const flow = draft.flows.find((f) => f.name === flowName);
					if (flow)
						flow.editorModel.edges = applyEdgeChanges(
							changes,
							flow.editorModel.edges
						);
				})
			),

		getOnEdgesChange: (flowName: string): ((changes: EdgeChange[]) => void) => {
			return (changes: EdgeChange[]) => {
				get().onEdgesChange(flowName, changes);
			};
		},

		onConnect: (flowName: string, connection) =>
			set(
				produce((draft: AppStore) => {
					const flow = draft.flows.find((f) => f.name === flowName);
					if (flow) {
						flow.editorModel.edges = addEdge(
							connection,
							flow.editorModel.edges
						);
					}
				})
			),

		getOnConnect: (flowName: string): ((connection: Connection) => void) => {
			return (connection: Connection) => {
				get().onConnect(flowName, connection);
			};
		},

		getEditorCallbacks: (flowName: string) => {
			return {
				onNodesChange: get().getOnNodesChange(flowName),
				onEdgesChange: get().getOnEdgesChange(flowName),
				onConnect: get().getOnConnect(flowName),
			};
		},

		// custom nodes IO

		getOutputs: (flowName: string, nodeId: string): Outputs | undefined =>
			getOutputs(get().getFlow(flowName) as FlowModel, nodeId),

		getOutput: (
			flowName: string,
			nodeId: string,
			outputId: string
		): OutputData | undefined => {
			return getOutputs(get().getFlow(flowName), nodeId)[outputId];
		},

		setOutput: (
			flowName: string,
			nodeId: string,
			outputId: string,
			output: OutputData
		) => {
			set(
				produce((draft: AppStore) => {
					const flow = findFlow(flowName, draft);
					if (flow) {
						const editorModel = flow.editorModel;
						// update outputs
						const node = findNode(nodeId, editorModel);
						if (node) node.data.outputs[outputId] = output;

						// update inputs
						const connectedNodes = findConnectedNodes(
							nodeId,
							false,
							outputId,
							editorModel
						);

						connectedNodes.forEach((connectedNode) => {
							connectedNode.node.data.inputs[connectedNode.connectedOn] =
								output;
						});
					}
				})
			);
		},

		getInputs: (flowName: string, nodeId: string): Inputs | undefined =>
			getInputs(nodeId, get().getFlow(flowName).editorModel),

		getInput: (
			flowName: string,
			nodeId: string,
			inputId: string
		): OutputData | undefined => {
			return getInputs(nodeId, get().getFlow(flowName).editorModel)[inputId];
		},

		// Node finding
		findNode: (
			nodeId: string,
			flowName: string
		): Node<CustomNodeData> | undefined => {
			const flow = findFlow(flowName, get());
			return findNode(nodeId, flow.editorModel);
		},
	})
	// 	{
	// 		name: "flow-app-store",
	// 		getStorage: () => localStorage,
	// 	}
	// )
);

export default useStore;
