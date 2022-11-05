import { Inputs } from "src/classes/nodes/outputs/Inputs";
import { selectInputs } from "src/data/selectors/editor/selectInputs";
import { useFlow } from "./useFlow";

export const useInputs = (
  nodeId: string,
  flowName?: string
): Inputs | undefined => {
  return selectInputs(nodeId, useFlow(flowName)?.editorModel);
};
