import { Inputs } from "src/classes/nodes/outputs/Inputs";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectInputs } from "src/data/selectors/editor/selectInputs";
import useAppModel from "src/data/store";

export const useInputs = (
  nodeId: string,
  flowName: string
): Inputs | undefined => {
  return useAppModel((store) =>
    selectInputs(nodeId, selectFlow(flowName, store)?.editorModel)
  );
};
