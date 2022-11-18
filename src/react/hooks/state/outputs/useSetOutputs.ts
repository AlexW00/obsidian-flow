import produce from "immer";
import { OutputData, Outputs } from "src/classes/nodes/outputs/Outputs";
import { Setter } from "src/classes/react/StateHookResult";
import AppModel from "src/data/models/AppModel";
import { setOutputs } from "src/data/setters/editor/setOutputs";
import useAppModel from "src/data/store";

export const useSetOutputs = (
  nodeId: string,
  flowName: string
): Setter<OutputData> => {
  const setter = (outputs: Outputs) =>
    useAppModel.setState(
      produce((draft: AppModel) => {
        setOutputs(outputs, nodeId, flowName, draft);
      })
    );
  return setter;
};
