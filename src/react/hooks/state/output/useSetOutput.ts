import { OutputData } from "../../../../classes/nodes/outputs/Outputs";
import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { setOutput } from "src/data/setters/editor/setOutput";
import { Setter } from "src/classes/react/StateHookResult";

export const useSetOutput = (
  outputId: string,
  nodeId: string,
  flowName: string
): Setter<OutputData> => {
  const setter = (output: OutputData) =>
    useAppModel.setState(
      produce((draft: AppModel) => {
        setOutput(output, outputId, nodeId, flowName, draft);
      })
    );
  return setter;
};
