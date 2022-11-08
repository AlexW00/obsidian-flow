import React, { useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { canConnect } from "src/classes/nodes/definition/io/handles/types/NodeHandleType";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { useEdges } from "src/react/hooks/state/useEdges";
import { useNodes } from "src/react/hooks/state/useNodes";
import { CustomNodeComponent } from "../molecules/nodes/CustomNode";

export const Editor = () => {
  console.log("Rendering Editor");
  const flowName = "example-flow";
  const nodeTypes = useMemo(() => ({ custom: CustomNodeComponent }), []);
  const [nodes, setNodes] = useNodes(flowName);
  const [edges, setEdges] = useEdges(flowName);

  const handleConnect = (connection: Connection) => {
    const sourceNode = selectNode(connection.source, nodes);
    const targetNode = selectNode(connection.target, nodes);

    const sourceHandleType =
      sourceNode.data.definition.io.outputs[connection.sourceHandle].type;
    const targetHandleType =
      targetNode.data.definition.io.inputs[connection.targetHandle].type;
    if (
      sourceNode.id !== targetNode.id &&
      canConnect(sourceHandleType, targetHandleType)
    ) {
      const newEdges = addEdge(connection, edges);
      setEdges(newEdges);
    } else {
      console.log("Cannot connect", sourceHandleType, targetHandleType);
    }
  };

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={(nodeChanges) => {
        const newNodes = applyNodeChanges(nodeChanges, nodes);
        setNodes(newNodes);
      }}
      onEdgesChange={(edgeChanges) => {
        const newEdges = applyEdgeChanges(edgeChanges, edges);
        console.log("newEdges", newEdges);
        setEdges(newEdges);
      }}
      onConnect={handleConnect}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};
