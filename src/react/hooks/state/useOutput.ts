import { OutputData } from "../../../classes/nodes/outputs/Outputs";
import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectOutputs } from "src/data/selectors/editor/selectOutputs";
import { setOutput } from "src/data/setters/editor/setOutput";
import { MutableHookResult } from "src/classes/react/StateHookResult";

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
    setter = (output: OutputData) =>
      useAppModel.setState(
        produce((draft: AppModel) => {
          setOutput(output, outputId, nodeId, flowName, draft);
        })
      );
  return [output, setter];
};
