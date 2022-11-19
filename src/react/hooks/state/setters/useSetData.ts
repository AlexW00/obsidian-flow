import { OutputData } from "../../../../classes/nodes/outputs/Outputs";
import useAppModel from "../../../../data/store";
import produce from "immer";
import AppModel from "../../../../data/models/AppModel";
import { Setter } from "src/classes/react/StateHookResult";
import { useFlowName } from "../../context/useFlowName";
import { useNodeId } from "../../context/useNodeId";
import { setNodeData } from "src/data/setters/editor/setNodeData";

export const useSetData = (): Setter<OutputData> => {
  const flowName = useFlowName(),
    nodeId = useNodeId(),
    setter = (data: any) =>
      useAppModel.setState(
        produce((draft: AppModel) => {
          setNodeData(data, nodeId, flowName, draft);
        })
      );
  return setter;
};
