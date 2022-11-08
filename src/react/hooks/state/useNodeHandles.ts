import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { setNodeHandles } from "src/data/setters/editor/setNodeHandles";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";

export const useNodeHandles = (
  isInput: boolean,
  nodeId: string,
  flowName: string
): MutableHookResult<NodeHandles> => {
  const nodeDefinition = useAppModel((store) => {
      const nodes = selectFlow(flowName, store)?.editorModel.nodes;
      const node = selectNode(nodeId, nodes);
      const definition = node?.data?.definition;
      const io = isInput ? definition?.io?.inputs : definition?.io?.outputs;
      return io;
    }),
    setter = (handles: NodeHandles) =>
      useAppModel.setState(
        produce((draft: AppModel) =>
          setNodeHandles(isInput, handles, nodeId, flowName, draft)
        )
      );
  return [nodeDefinition, setter];
};
