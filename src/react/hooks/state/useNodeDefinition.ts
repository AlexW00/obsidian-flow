import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { setNodeDefinition } from "src/data/setters/editor/setNodeDefinition";

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
    setter = (definition: CustomNodeDefinition) =>
      useAppModel.setState(
        produce((draft: AppModel) =>
          setNodeDefinition(definition, nodeId, flowName, draft)
        )
      );
  return [nodeDefinition, setter];
};
