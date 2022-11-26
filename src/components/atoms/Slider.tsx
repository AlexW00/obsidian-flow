import React, { useEffect } from "react";
import { max as maxLayout } from "src/styles/layout";
import { LabeledContainerComponent } from "../molecules/inputs/basic/LabeledContainer";
import { DynamicInputComponent } from "./DynamicInput";

export type SliderComponentProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (newValue: number) => void;
  onStepSizeChange?: (newStepSize: number) => void;
  onMinChange?: (newMin: number) => void;
  onMaxChange?: (newMax: number) => void;
  onBlur?: (newValue: number) => void;
  disabled?: boolean;
};

export const SliderComponent = ({
  value,
  min,
  max,
  step,
  onValueChange,
  onStepSizeChange,
  onMinChange,
  onMaxChange,
  onBlur,
}: SliderComponentProps): JSX.Element => {
  const [_value, setValue] = React.useState<number>(value ?? 0);
  const [_min, setMin] = React.useState<number>(min ?? 0);
  const [_max, setMax] = React.useState<number>(max ?? 1);
  const [_step, setStep] = React.useState<number>(step ?? 0.01);

  useEffect(() => {
    setValue(value ?? 0);
    setMin(min ?? 0);
    setMax(max ?? 1);
    setStep(step ?? 0.01);
  }, [value, min, max, step]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    onValueChange(newValue);
  };

  const handleBlur = () => {
    onBlur?.(value);
  };

  const handleStepChange = (newValue: number) => {
    setStep(newValue);
    onStepSizeChange?.(newValue);
  };

  const handleMinChange = (newValue: number) => {
    setMin(newValue);
    onMinChange?.(newValue);
  };

  const handleMaxChange = (newValue: number) => {
    setMax(newValue);
    onMaxChange?.(newValue);
  };

  return (
    <div style={maxLayout}>
      <input
        type="range"
        className="nodrag"
        value={_value}
        min={_min}
        max={_max}
        step={_step}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div style={{ ...maxLayout }}>
        <LabeledContainerComponent name="min">
          <DynamicInputComponent
            type="number"
            value={_min}
            onChange={handleMinChange}
          />
        </LabeledContainerComponent>
        <LabeledContainerComponent name="step">
          <DynamicInputComponent
            type="number"
            value={_step}
            onChange={handleStepChange}
          />
        </LabeledContainerComponent>
        <LabeledContainerComponent name="max">
          <DynamicInputComponent
            type="number"
            value={_max}
            onChange={handleMaxChange}
          />
        </LabeledContainerComponent>
      </div>
    </div>
  );
};
