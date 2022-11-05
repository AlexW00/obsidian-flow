import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import useStore from "src/data/store";
import { CustomNodeComponent } from "../molecules/nodes/CustomNode";

export const Editor = () => {
	const appState = useStore();

	const nodeTypes = useMemo(() => ({ custom: CustomNodeComponent }), []);

	const { onNodesChange, onEdgesChange, onConnect } =
		appState.getEditorCallbacks("example-flow");
	const flow = appState.getFlow("example-flow");
	const { nodes, edges } = flow.editorModel;

	return (
		<ReactFlow
			nodeTypes={nodeTypes}
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
		>
			<MiniMap />
			<Controls />
			<Background />
		</ReactFlow>
	);
};
