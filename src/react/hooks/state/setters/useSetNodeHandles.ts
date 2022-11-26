import produce from "immer";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";
import { Setter } from "src/classes/react/StateHookResult";
import AppModel from "src/data/models/AppModel";
import { setNodeHandles } from "src/data/setters/editor/setNodeHandles";
import useAppModel from "src/data/store";
import { useFlowName } from "../../context/useFlowName";
import { useNodeId } from "../../context/useNodeId";

export const useSetNodeHandles = (isInput: boolean): Setter<NodeHandles> => {
  const flowName = useFlowName(),
    nodeId = useNodeId(),
    updateInternals = useUpdateNodeInternals(),
    setter = (handles: NodeHandles) => {
      console.log("useSetNodeHandles", handles);
      useAppModel.setState(
        produce((draft: AppModel) =>
          setNodeHandles(isInput, handles, nodeId, flowName, draft)
        )
      );
      updateInternals(nodeId);
    };
  return setter;
};
