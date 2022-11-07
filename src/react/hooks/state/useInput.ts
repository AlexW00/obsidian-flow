import { OutputData } from "../../../classes/nodes/outputs/Outputs";
import { selectInput } from "src/data/selectors/editor/selectInput";
import useAppModel from "src/data/store";
import { selectFlow } from "src/data/selectors/app/selectFlow";

export const useInput = (
  inputId: string,
  nodeId: string,
  flowName: string
): OutputData => {
  return useAppModel((store) =>
    selectInput(inputId, nodeId, selectFlow(flowName, store)?.editorModel)
  );
};
