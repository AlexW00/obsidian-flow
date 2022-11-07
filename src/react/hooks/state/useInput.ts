import { OutputData } from "../../../classes/nodes/outputs/Outputs";
import { useContext } from "react";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { selectInput } from "src/data/selectors/editor/selectInput";
import useAppModel from "src/data/store";
import { selectFlow } from "src/data/selectors/app/selectFlow";

export const useInput = (
  inputId: string,
  nodeId: string,
  flowName?: string
): OutputData => {
  const _flowName = flowName || useContext(FlowNameContext);
  return useAppModel((store) =>
    selectInput(inputId, nodeId, selectFlow(_flowName, store)?.editorModel)
  );
};
