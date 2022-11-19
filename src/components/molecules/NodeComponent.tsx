import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { NodeIdContext } from "src/react/contexts/NodeIdContext";
import { HandlesComponent } from "./HandlesComponent";

export const NodeComponent: FunctionComponent<NodeProps<CustomNodeData>> = (
  props: PropsWithChildren<NodeProps<CustomNodeData>>,
  _context?: any
) => {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(props.id);
  }, []);

  const CustomNodeComponent = props.data.component;

  return (
    <NodeIdContext.Provider value={props.id}>
      <div className="custom-node react-flow__node-default">
        <HandlesComponent
          isInput={true}
          handles={props.data.definition.io.inputs}
        />
        <CustomNodeComponent
          outputs={props.data.outputs}
          inputs={props.data.inputs}
          definition={props.data.definition}
        />
        <HandlesComponent
          isInput={false}
          handles={props.data.definition.io.outputs}
        />
      </div>
    </NodeIdContext.Provider>
  );
};