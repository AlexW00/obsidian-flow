import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "reactflow";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import useAppModel from "src/data/store";

import { MutableHookResult } from "src/classes/react/StateHookResult";
import { setNodes } from "src/data/setters/editor/setNodes";
import produce from "immer";

export const useNodes = (
  flowName: string
): MutableHookResult<Node<CustomNodeData>[]> => {
  const nodes = useAppModel(
      (store) => selectFlow(flowName, store)?.editorModel.nodes
    ),
    setter = (nodes: Node<CustomNodeData>[]) => {
      useAppModel.setState(
        produce((draft) => setNodes(nodes, flowName, draft))
      );
    };
  return [nodes, setter];
};
