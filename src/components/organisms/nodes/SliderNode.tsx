import React, { useEffect } from "react";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { NumberHandle } from "src/classes/nodes/definition/io/handles/types/base/NumberHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { SliderComponent } from "src/components/atoms/Slider";
import { useSetData } from "src/react/hooks/state/setters/useSetData";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";
import { useSetOutput } from "src/react/hooks/state/setters/useSetOutput";

export const SliderNodeComponent = ({
  outputs,
  data,
}: CustomNodeComponentProps): JSX.Element => {
  const setNodeDefinition = useSetDefinition();
  const setOutput = useSetOutput("output");
  const setData = useSetData();

  useEffect(() => {
    setNodeDefinition(SliderNodeDefinition);
  }, []);

  const handleValueChange = (newValue: number) => {
    console.log(newValue);
    setOutput(newValue);
  };

  const handleMinMaxChange = (newValue: number, isMin: boolean) => {
    const newData = { ...data };
    if (isMin) {
      newData.min = newValue;
    } else {
      newData.max = newValue;
    }
    setData(newData);
  };

  const handleStepChange = (newValue: number) => {
    setData({
      ...data,
      step: newValue,
    });
  };

  return (
    <SliderComponent
      value={outputs.output}
      onValueChange={handleValueChange}
      onMinChange={(newValue) => handleMinMaxChange(newValue, true)}
      onMaxChange={(newValue) => handleMinMaxChange(newValue, false)}
      onStepSizeChange={handleStepChange}
      min={data.min}
      max={data.max}
      step={data.step}
    />
  );
};

export const SliderNodeDefinition: CustomNodeDefinition = {
  name: "Slider Node",
  io: {
    inputs: {},
    outputs: {
      output: {
        description: "Number Output",
        type: NumberHandle,
      },
    },
  },
};
