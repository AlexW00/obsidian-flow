import React, { useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Connection,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { canConnect } from "src/classes/nodes/definition/io/handles/types/NodeHandleType";
import { Setters } from "src/data/setters/Setters";
import useAppModel from "src/data/store";
import { useFlow } from "src/react/hooks/selectors/useFlow";
import { useNode } from "src/react/hooks/selectors/useNode";
import { CustomNodeComponent } from "../molecules/nodes/CustomNode";

export const Editor = () => {
  console.log("Rendering Editor");
  const nodeTypes = useMemo(() => ({ custom: CustomNodeComponent }), []);
  const flowName = "example-flow";

  const onConnect = (connection: Connection) =>
    Setters.setConnection(connection, flowName, useAppModel);
  const onNodesChange = (changes: NodeChange[]) =>
    Setters.setNodeChanges(changes, flowName, useAppModel);
  const onEdgesChange = (changes: EdgeChange[]) =>
    Setters.setEdgeChanges(changes, flowName, useAppModel);

  const flow = useFlow();
  const { nodes, edges } = flow.editorModel;

  const handleConnect = (connection: Connection) => {
    const sourceNode = useNode(connection.source);
    const targetNode = useNode(connection.target);

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
