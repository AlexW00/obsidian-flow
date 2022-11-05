import { useInputs } from "./useInputs";
import { OutputData } from "../../../classes/nodes/outputs/Outputs";

export const useInput = (
  inputId: string,
  nodeId: string,
  flowName?: string
): OutputData => {
  return useInputs(nodeId, flowName)[inputId];
};
