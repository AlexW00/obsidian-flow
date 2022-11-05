import { OutputData } from "src/classes/nodes/outputs/Outputs";
import { selectOutputs } from "src/data/selectors/editor/selectOutputs";
import { useFlow } from "./useFlow";

export const useOutputs = (
  nodeId: string,
  flowName?: string
): OutputData | undefined => {
  return selectOutputs(nodeId, useFlow(flowName)?.editorModel);
};
