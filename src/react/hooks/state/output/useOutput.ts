import { OutputData } from "../../../../classes/nodes/outputs/Outputs";
import useAppModel from "src/data/store";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectOutputs } from "src/data/selectors/editor/selectOutputs";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { useSetOutput } from "./useSetOutput";

export const useOutput = (
  outputId: string,
  nodeId: string,
  flowName: string
): MutableHookResult<OutputData> => {
  const output = useAppModel(
      (store) =>
        selectOutputs(nodeId, selectFlow(flowName, store)?.editorModel)[
          outputId
        ]
    ),
    setter = useSetOutput(outputId, nodeId, flowName);
  return [output, setter];
};
