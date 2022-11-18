import { useContext } from "react";
import { FlowNameContext } from "../../../react/contexts/FlowNameContext";

export const useFlowName = (): string => {
  const flowName = useContext(FlowNameContext);
  return flowName;
};
