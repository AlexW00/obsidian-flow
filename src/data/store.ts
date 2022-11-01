import create from "zustand";
import {
	NodeChange,
	EdgeChange,
	Connection,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
} from "reactflow";

import produce from "immer";

import appModel from "./example/appModel";
import AppModel from "./models/AppModel";
import FlowModel from "./models/FlowModel";

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
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppStore>((set, get) => {
	const appState: AppStore = {
		flows: appModel.flows, // Example flow, TODO: Remove
		// Flows
		setFlow: (flow: FlowModel) =>
			set(
				produce((draft: AppStore) => {
					const flowIndex = draft.flows.findIndex((f) => f.name === flow.name);
					if (flowIndex !== -1) {
						draft.flows[flowIndex] = flow;
					} else {
						draft.flows.push(flow);
					}
				})
			),
		getFlow: (name: string): FlowModel | undefined =>
			get().flows.find((f) => f.name === name),

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

		onConnect: (flowName, connection) =>
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
	};

	return appState;
});

export default useStore;
