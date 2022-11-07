import { OutputData } from "../../../classes/nodes/outputs/Outputs";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectOutputs } from "src/data/selectors/editor/selectOutputs";
import { setOutputs } from "src/data/setters/editor/setOutputs";

export const useOutput = (
  outputId: string,
  nodeId: string,
  flowName: string
): MutableHookResult<OutputData> => {
  return [
    useAppModel(
      (store) =>
        selectOutputs(nodeId, selectFlow(flowName, store)?.editorModel)[
          outputId
        ]
    ),
    (output: OutputData) =>
      useAppModel.setState(
        produce((draft: AppModel) => {
          setOutputs(output, nodeId, flowName, draft);
        })
      ),
  ];
};
