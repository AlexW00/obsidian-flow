import React, { useEffect } from "react";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { AnyHandle } from "src/classes/nodes/definition/io/handles/types/base/AnyHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { useNodeId } from "src/react/hooks/context/useNodeId";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";
import { useSetOutput } from "src/react/hooks/state/setters/useSetOutput";

export const ExampleNodeComponent = ({
  inputs,
  outputs,
}: CustomNodeComponentProps) => {
  const id = useNodeId();
  console.log("Rendering Example Node with id" + id);

  const setNodeDefinition = useSetDefinition();
  const setOutput = useSetOutput("output");

  useEffect(() => {
    // Here we set the definition of the node
    // = inputs/outputs and their types
    setNodeDefinition(ExampleNodeDefinition);
  }, []);

  const onClickButton = () => {
    // Update the output of this node
    const newOutput = (outputs.output ?? "") + "!";
    setOutput(newOutput);
  };

  return (
    <div>
      <h3>Example Node</h3>
      <div>Input: {inputs?.input?.toString()}</div>
      <div>Output: {outputs?.output}</div>
      <button onClick={onClickButton}>Add "!"</button>
    </div>
  );
};

export const ExampleNodeDefinition: CustomNodeDefinition = {
  io: {
    inputs: {
      input: {
        description: "Input",
        type: AnyHandle,
      },
    },
    outputs: {
      output: {
        description: "Output",
        type: AnyHandle,
      },
    },
  },
};
