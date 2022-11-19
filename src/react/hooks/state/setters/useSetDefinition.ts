import useAppModel from "../../../../data/store";
import produce from "immer";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { setNodeDefinition } from "../../../../data/setters/editor/setNodeDefinition";
import { useFlowName } from "../../context/useFlowName";
import { Setter } from "src/classes/react/StateHookResult";
import { useNodeId } from "../../context/useNodeId";
import { useUpdateNodeInternals } from "react-flow-renderer";

export const useSetDefinition = (): Setter<CustomNodeDefinition> => {
  const flowName = useFlowName(),
    nodeId = useNodeId(),
    updateInternals = useUpdateNodeInternals(),
    setter = (definition: CustomNodeDefinition) => {
      useAppModel.setState(
        produce((draft) =>
          setNodeDefinition(definition, nodeId, flowName, draft)
        )
      );
      updateInternals(nodeId);
    };
  return setter;
};
