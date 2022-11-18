import produce from "immer";
import NodeHandleType from "src/classes/nodes/definition/io/handles/types/NodeHandleType";
import { Setter } from "src/classes/react/StateHookResult";
import AppModel from "src/data/models/AppModel";
import { setNodeHandleType } from "src/data/setters/editor/setNodeHandleType";
import useAppModel from "src/data/store";
import { useFlowName } from "../../context/useFlowName";

export const useSetNodeHandleType = (
  isInput: boolean,
  name: string,
  nodeId: string
): Setter<NodeHandleType> => {
  const flowName = useFlowName(),
    setter = (type: NodeHandleType) =>
      useAppModel.setState(
        produce((draft: AppModel) =>
          setNodeHandleType(isInput, name, type, nodeId, flowName, draft)
        )
      );
  return setter;
};
