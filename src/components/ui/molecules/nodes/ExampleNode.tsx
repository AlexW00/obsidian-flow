import React, { useContext, useEffect } from "react";
import { NumberHandle } from "src/classes/nodes/definition/io/handles/types/base/NumberHandle";
import { ObjectHandle } from "src/classes/nodes/definition/io/handles/types/base/ObjectHandle";
import { StringHandle } from "src/classes/nodes/definition/io/handles/types/base/StringHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { useInputs } from "src/react/hooks/state/useInputs";
import { useNodeDefinition } from "src/react/hooks/state/useNodeDefinition";
import { useOutput } from "src/react/hooks/state/useOutput";
import { useOutputs } from "src/react/hooks/state/useOutputs";

export const ExampleNodeComponent = (id: string) => {
  const flowName = useContext(FlowNameContext);
  console.log("Rendering CustomNodeComponent in flow named", flowName);

  const setNodeDefinition = useNodeDefinition(id, flowName)[1];
  useEffect(() => {
    setNodeDefinition(ExampleNode);
  }, []);

  const inputs = useInputs(id, flowName);
  const [outputs] = useOutputs(id, flowName);
  const setOutput = useOutput("output1", id, flowName)[1];

  console.log("CustomNodeComponent", id, inputs, outputs);

  const onClickButton = () => {
    console.log("onClickButton", outputs);
    const newOutput = (outputs.output1 ?? "") + "!";
    setOutput(newOutput);
  };
  return (
    <div>
      <h3>MyCustomNode</h3>
      <div>Input: {inputs?.input1 ?? "empty"}</div>
      <div>Output: {outputs?.output1 ?? "empty"}</div>
      <button onClick={onClickButton}>Increment</button>
    </div>
  );
};

export const ExampleNode: CustomNodeDefinition = {
  io: {
    inputs: {
      input1: {
        name: "Input 1",
        type: StringHandle,
      },
      input2: {
        name: "Input 2",
        type: NumberHandle,
      },
    },
    outputs: {
      output1: {
        name: "Output 1",
        type: StringHandle,
      },
      output2: {
        name: "Output 2",
        type: ObjectHandle,
      },
    },
  },
};
