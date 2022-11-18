import useAppModel from "src/data/store";
import produce from "immer";
import AppModel from "src/data/models/AppModel";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { setNodeDefinition } from "src/data/setters/editor/setNodeDefinition";
import { Setter } from "src/classes/react/StateHookResult";

export const useSetNodeDefinition = (
  nodeId: string,
  flowName: string
): Setter<CustomNodeDefinition> => {
  const setter = (definition: CustomNodeDefinition) =>
    useAppModel.setState(
      produce((draft: AppModel) =>
        setNodeDefinition(definition, nodeId, flowName, draft)
      )
    );
  return setter;
};
