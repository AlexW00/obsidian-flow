import { useContext } from "react";
import { NodeIdContext } from "src/react/contexts/NodeIdContext";

export const useNodeId = (): string => {
  const nodeId = useContext(NodeIdContext);
  return nodeId;
};
