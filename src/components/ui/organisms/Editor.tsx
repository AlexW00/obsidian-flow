import React, { useMemo } from "react";
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { canConnect } from "src/classes/nodes/definition/io/handles/types/NodeHandleType";
import useStore from "src/data/store";
import { CustomNodeComponent } from "../molecules/nodes/CustomNode";

export const Editor = () => {
	const appState = useStore();

	const nodeTypes = useMemo(() => ({ custom: CustomNodeComponent }), []);

	const { onNodesChange, onEdgesChange, onConnect } =
		appState.getEditorCallbacks("example-flow");
	const flow = appState.getFlow("example-flow");
	const { nodes, edges } = flow.editorModel;
	const handleConnect = (connection: Connection) => {
		const sourceNode = appState.findNode(connection.source, "example-flow");
		const targetNode = appState.findNode(connection.target, "example-flow");
		const sourceHandleType =
			sourceNode.data.definition.io.outputs[connection.sourceHandle].type;
		const targetHandleType =
			targetNode.data.definition.io.inputs[connection.targetHandle].type;
		if (canConnect(sourceHandleType, targetHandleType)) {
			onConnect(connection);
		} else {
			console.log("Cannot connect", sourceHandleType, targetHandleType);
		}
	};

	return (
		<ReactFlow
			nodeTypes={nodeTypes}
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={handleConnect}
		>
			<MiniMap />
			<Controls />
			<Background />
		</ReactFlow>
	);
};
