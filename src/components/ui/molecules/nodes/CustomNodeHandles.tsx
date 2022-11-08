import React from "react";
import { useContext } from "react";
import { Handle, Position } from "reactflow";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { useNodeHandles } from "src/react/hooks/state/useNodeHandles";

export const CustomNodeHandles = ({
  nodeId,
  isInput,
}: {
  nodeId: string;
  isInput: boolean;
}) => {
  const flowName = useContext(FlowNameContext);
  const [nodeHandles] = useNodeHandles(isInput, nodeId, flowName);

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

  return <>{nodeHandles && mapHandles(nodeHandles, isInput)}</>;
};
