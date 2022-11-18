import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "reactflow";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { NodeIdContext } from "src/react/contexts/NodeIdContext";
import { CustomNodeHandles } from "./CustomNodeHandles";

export const CustomNodeComponent: FunctionComponent<
  NodeProps<CustomNodeData>
> = (props: PropsWithChildren<NodeProps<CustomNodeData>>, _context?: any) => {
  console.log("rendering CustomNodeComponent", props.id);
  console.log(props);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(props.id);
  }, []);

  const ContentComponent = props.data.component;

  return (
    <NodeIdContext.Provider value={props.id}>
      <div className="custom-node react-flow__node-default">
        <CustomNodeHandles isInput={true} />
        <ContentComponent />
        <CustomNodeHandles isInput={false} />
      </div>
    </NodeIdContext.Provider>
  );
};
