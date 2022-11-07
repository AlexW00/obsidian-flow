import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "reactflow";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import useAppModel from "src/data/store";
import { useContext } from "react";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { setNodes } from "src/data/setters/editor/setNodes";
import produce from "immer";

export const useNodes = (
  flowName?: string
): MutableHookResult<Node<CustomNodeData>[]> => {
  const _flowName = flowName || useContext(FlowNameContext);
  return [
    useAppModel((store) => selectFlow(_flowName, store)?.editorModel.nodes),
    (nodes: Node<CustomNodeData>[]) => {
      useAppModel.setState(
        produce((draft) => setNodes(nodes, flowName, draft))
      );
    },
  ];
};
