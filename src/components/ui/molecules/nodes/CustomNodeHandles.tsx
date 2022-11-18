import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";

export const CustomNodeHandles = ({
  isInput,
  handles,
}: {
  isInput: boolean;
  handles: NodeHandles;
}) => {
  const calculateHandleTopOffset = (
    index: number,
    numHandles: number
  ): string => {
    const offset = 100 / (numHandles + 1);
    return `${offset * (index + 1)}%`;
  };

  const mapHandles = (io: NodeHandles, isInput: boolean): JSX.Element[] => {
    const keys = Object.keys(io);

    return keys.map((key, index) => {
      const handleTopOffset = calculateHandleTopOffset(index, keys.length);
      const type = io[key].type;
      return (
        <Handle
          key={key}
          id={key}
          type={isInput ? "target" : "source"}
          position={isInput ? Position.Left : Position.Right}
          style={{
            top: handleTopOffset,
            background: type.color,
          }}
        />
      );
    });
  };

  return <>{handles && mapHandles(handles, isInput)}</>;
};
