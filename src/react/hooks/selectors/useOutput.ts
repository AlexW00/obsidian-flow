import { useOutputs } from "./useOutputs";
import { OutputData } from "../../../classes/nodes/outputs/Outputs";

export const useOutput = (
  outputId: string,
  nodeId: string,
  flowName?: string
): OutputData | undefined => {
  return useOutputs(nodeId, flowName)[outputId];
};
