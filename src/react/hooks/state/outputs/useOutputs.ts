import { OutputData } from "src/classes/nodes/outputs/Outputs";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectOutputs } from "src/data/selectors/editor/selectOutputs";
import useAppModel from "src/data/store";
import { useSetOutputs } from "./useSetOutputs";

export const useOutputs = (
  nodeId: string,
  flowName: string
): MutableHookResult<OutputData> => {
  const outputs = useAppModel((store) =>
      selectOutputs(nodeId, selectFlow(flowName, store)?.editorModel)
    ),
    setter = useSetOutputs(nodeId, flowName);
  return [outputs, setter];
};
