import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectNodeHandles } from "src/data/selectors/editor/selectNodeHandles";
import { NodeHandle } from "src/classes/nodes/definition/io/handles/NodeHandle";
import { setNodeHandle } from "src/data/setters/editor/setNodeHandle";

export const useNodeHandle = (
  isInput: boolean,
  name: string,
  nodeId: string,
  flowName: string
): MutableHookResult<NodeHandle> => {
  const nodeDefinition = useAppModel(
      (store) => selectNodeHandles(isInput, nodeId, flowName, store)[name]
    ),
    setter = (handle: NodeHandle) =>
      useAppModel.setState(
        produce((draft: AppModel) =>
          setNodeHandle(isInput, name, handle, nodeId, flowName, draft)
        )
      );
  return [nodeDefinition, setter];
};
