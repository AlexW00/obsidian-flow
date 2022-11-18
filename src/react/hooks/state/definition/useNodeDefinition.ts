import useAppModel from "src/data/store";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { useSetNodeDefinition } from "./useSetNodeDefinition";

export const useNodeDefinition = (
  nodeId: string,
  flowName: string
): MutableHookResult<CustomNodeDefinition> => {
  const nodeDefinition = useAppModel((store) => {
      const nodes = selectFlow(flowName, store)?.editorModel.nodes;
      const node = selectNode(nodeId, nodes);
      const definition = node?.data.definition;
      return definition;
    }),
    setter = useSetNodeDefinition(nodeId, flowName);
  return [nodeDefinition, setter];
};
