import React, { FunctionComponent, PropsWithChildren } from "react";
import { NodeProps } from "react-flow-renderer";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { NodeIdContext } from "src/react/contexts/NodeIdContext";
import { wrapContent } from "src/styles/layout";
import { HandlesComponent } from "./Handles";

export const NodeComponent: FunctionComponent<NodeProps<CustomNodeData>> = (
  props: PropsWithChildren<NodeProps<CustomNodeData>>,
  _context?: any
) => {
  const CustomNodeComponent = props.data.component;

  return (
    <NodeIdContext.Provider value={props.id}>
      <div className="custom-node react-flow__node-default" style={wrapContent}>
        <HandlesComponent
          isInput={true}
          handles={props.data.definition.io.inputs}
        />
        <div style={wrapContent}>
          <h3>{props.data.definition.name}</h3>
          <CustomNodeComponent
            outputs={props.data.outputs}
            inputs={props.data.inputs}
            definition={props.data.definition}
            data={props.data.data}
          />
        </div>

        <HandlesComponent
          isInput={false}
          handles={props.data.definition.io.outputs}
        />
      </div>
    </NodeIdContext.Provider>
  );
};
