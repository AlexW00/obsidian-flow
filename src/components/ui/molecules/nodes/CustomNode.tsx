import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "reactflow";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { CustomNodeHandles } from "./CustomNodeHandles";

export const CustomNodeComponent: FunctionComponent<
  NodeProps<CustomNodeData>
> = (props: PropsWithChildren<NodeProps<CustomNodeData>>, _context?: any) => {
  console.log("rendering CustomNodeComponent", props.id);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(props.id);
  }, []);

  // rendering content first because
  // at first render, the definition of the handles gets initialized
  const content = props.data.component(props.id);
  return (
    <div className="custom-node react-flow__node-default">
      <CustomNodeHandles nodeId={props.id} isInput={true} />
      <div>{content}</div>
      <CustomNodeHandles nodeId={props.id} isInput={false} />
    </div>
  );
};
