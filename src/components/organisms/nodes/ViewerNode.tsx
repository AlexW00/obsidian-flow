import React, { useEffect } from "react";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { AnyHandle } from "src/classes/nodes/definition/io/handles/types/base/AnyHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { ViewerComponent } from "src/components/molecules/Viewer";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";

export const ViewerNodeComponent = ({
  inputs,
}: CustomNodeComponentProps): JSX.Element => {
  const setNodeDefinition = useSetDefinition();

  // Initial render, set node definition
  useEffect(() => {
    setNodeDefinition(ViewerNodeDefinition);
  }, []);

  return <ViewerComponent value={inputs.input} />;
};

export const ViewerNodeDefinition: CustomNodeDefinition = {
  name: "Viewer Node",
  io: {
    inputs: {
      input: {
        description: "Viewing input",
        type: AnyHandle,
      },
    },
    outputs: {},
  },
};
