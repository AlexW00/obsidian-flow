import { useContext } from "react";
import { Inputs } from "src/classes/nodes/outputs/Inputs";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectInputs } from "src/data/selectors/editor/selectInputs";
import useAppModel from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";

export const useInputs = (
  nodeId: string,
  flowName?: string
): Inputs | undefined => {
  const _flowName = flowName || useContext(FlowNameContext);
  return useAppModel((store) =>
    selectInputs(nodeId, selectFlow(_flowName, store)?.editorModel)
  );
};
