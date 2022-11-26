import React from "react";

export enum LabelPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

export type LabeledContainerProps = {
  name: string;
  labelPosition?: LabelPosition;
  children: React.ReactNode;
};

export const LabeledContainerComponent = ({
  name,
  labelPosition = LabelPosition.Left,
  children,
}: LabeledContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: labelPosToFlexDir(labelPosition),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
      <label>{name}</label>
    </div>
  );
};

const labelPosToFlexDir = (labelPosition: LabelPosition): any => {
  switch (labelPosition) {
    case "left":
      return "row-reverse";
    case "right":
      return "row";
    case "top":
      return "column-reverse";
    case "bottom":
      return "column";
  }
};
