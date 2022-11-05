import React, { useContext } from "react";
import { NumberHandle } from "src/classes/nodes/definition/io/handles/types/base/NumberHandle";
import { ObjectHandle } from "src/classes/nodes/definition/io/handles/types/base/ObjectHandle";
import { StringHandle } from "src/classes/nodes/definition/io/handles/types/base/StringHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { OutputData } from "src/classes/nodes/outputs/Outputs";
import { Setters } from "src/data/setters/Setters";
import useAppModel from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { useInputs } from "src/react/hooks/selectors/useInputs";
import { useOutputs } from "src/react/hooks/selectors/useOutputs";

export const CustomNodeComponent = (id: string) => {
  const flowName = useContext(FlowNameContext);
  console.log("Rendering CustomNodeComponent in flow named", flowName);

  const inputs = useInputs(id);
  const outputs = useOutputs(id);

  const setOutput = (output: OutputData, outputId: string) =>
    Setters.setOutput(output, outputId, id, flowName, useAppModel);

  console.log("CustomNodeComponent", id, inputs, outputs);

  const onClickButton = () => {
    console.log("onClickButton", outputs);
    const newOutput = (outputs.output1 ?? "") + "!";
    setOutput(newOutput, "output1");
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
  content: (_io, id) => CustomNodeComponent(id),
};
