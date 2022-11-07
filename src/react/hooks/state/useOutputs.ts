import produce from "immer";
import { OutputData, Outputs } from "src/classes/nodes/outputs/Outputs";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectOutputs } from "src/data/selectors/editor/selectOutputs";
import { setOutputs } from "src/data/setters/editor/setOutputs";
import useAppModel from "src/data/store";

export const useOutputs = (
  nodeId: string,
  flowName: string
): MutableHookResult<OutputData> => {
  const outputs = useAppModel((store) =>
      selectOutputs(nodeId, selectFlow(flowName, store)?.editorModel)
    ),
    setter = (outputs: Outputs) =>
      useAppModel.setState(
        produce((draft: AppModel) => {
          setOutputs(outputs, nodeId, flowName, draft);
        })
      );
  return [outputs, setter];
};
