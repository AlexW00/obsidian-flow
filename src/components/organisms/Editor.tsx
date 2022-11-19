import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import { areCompatible } from "src/classes/nodes/definition/io/handles/types/NodeHandleType";
import { selectNode } from "src/data/selectors/editor/selectNode";
import useAppModel from "src/data/store";
import { useFlowName } from "src/react/hooks/context/useFlowName";
import { useGetEdges } from "src/react/hooks/state/getters/useGetEdges";
import { useGetNodes } from "src/react/hooks/state/getters/useGetNodes";
import { NodeComponent } from "../molecules/NodeComponent";

export const Editor = () => {
  const flowName = useFlowName();
  const nodes = useGetNodes();
  const edges = useGetEdges();

  const { onNodesChange, onEdgesChange, onConnect } = useAppModel();

  const nodeTypes = useMemo(() => ({ custom: NodeComponent }), []);

  console.log("Rendering Editor");

  const handleConnect = (connection: Connection) => {
    const sourceNode = selectNode(connection.source, nodes);
    const targetNode = selectNode(connection.target, nodes);

    const sourceHandleType =
      sourceNode.data.definition.io.outputs[connection.sourceHandle].type;
    const targetHandleType =
      targetNode.data.definition.io.inputs[connection.targetHandle].type;
    if (
      sourceNode.id !== targetNode.id &&
      areCompatible(sourceHandleType, targetHandleType)
    ) {
      onConnect(connection, flowName);
    } else {
      console.log("Cannot connect", sourceHandleType, targetHandleType);
    }
  };

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={(nodeChanges) => onNodesChange(nodeChanges, flowName)}
      onEdgesChange={(edgeChanges) => onEdgesChange(edgeChanges, flowName)}
      onConnect={handleConnect}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};
