import React, { useEffect } from "react";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { AnyHandle } from "src/classes/nodes/definition/io/handles/types/base/AnyHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { useNodeId } from "src/react/hooks/context/useNodeId";
import { useSetData } from "src/react/hooks/state/setters/useSetData";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";
import { useSetOutput } from "src/react/hooks/state/setters/useSetOutput";
import { useCodeExecutor } from "src/react/hooks/util/useCodeExecutor";

export const FunctionNodeComponent = ({
  inputs,
  data,
}: CustomNodeComponentProps) => {
  const id = useNodeId();
  console.log("Rendering Code Node with id" + id);

  const setNodeDefinition = useSetDefinition();
  const setOutput = useSetOutput("output");
  const setData = useSetData();
  const codeExecutor = useCodeExecutor("inputs");

  useEffect(() => {
    setNodeDefinition(CodeNodeDefinition);
  }, []);

  const onClickButton = () => {
    console.log("onClickButton");
    const { value, error } = codeExecutor(data.code, inputs);
    if (error) {
      console.error(error);
    } else {
      setOutput(value);
      console.log("value", value);
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setData({ code: e.target.value });
  };

  return (
    <div>
      <h3>Code Node</h3>
      <textarea onChange={onTextChange} />
      <button onClick={onClickButton}>Run</button>
    </div>
  );
};

export const CodeNodeDefinition: CustomNodeDefinition = {
  io: {
    inputs: {},
    outputs: {
      output: {
        name: "Output",
        type: AnyHandle,
      },
    },
  },
};
