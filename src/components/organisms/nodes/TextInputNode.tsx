import React, { useEffect } from "react";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { StringHandle } from "src/classes/nodes/definition/io/handles/types/base/StringHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { useSetData } from "src/react/hooks/state/setters/useSetData";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";
import { useSetOutput } from "src/react/hooks/state/setters/useSetOutput";
import { max } from "src/styles/layout";

export const TextInputNodeComponent = ({
  data,
}: CustomNodeComponentProps): JSX.Element => {
  const setNodeDefinition = useSetDefinition();
  const setOutput = useSetOutput("output");
  const setData = useSetData();
  const [textBuffer, setTextBuffer] = React.useState(data.value);

  useEffect(() => {
    setNodeDefinition(TextInputNodeDefinition);
    setTextBuffer(data.value);
  }, []);

  const handleTextChange = (newText: string) => {
    setData(newText);
    setOutput(newText);
  };

  // textarea
  return (
    <input
      style={max}
      type="text"
      value={data.value}
      onBlur={() => handleTextChange(textBuffer)}
      onChange={(e) => setTextBuffer(e.target.value)}
    />
  );
};

export const TextInputNodeDefinition: CustomNodeDefinition = {
  name: "Text Input Node",
  io: {
    inputs: {},
    outputs: {
      output: {
        description: "Text",
        type: StringHandle,
      },
    },
  },
};
