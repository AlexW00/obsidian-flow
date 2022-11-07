import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { Node } from "reactflow";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import useAppModel from "src/data/store";
import { useContext } from "react";
import { FlowNameContext } from "src/react/contexts/FlowContext";

export const useNode = (
  nodeId: string,
  flowName?: string
): Node<CustomNodeData> | undefined => {
  const _flowName = flowName || useContext(FlowNameContext);
  return useAppModel((store) =>
    selectNode(nodeId, selectFlow(_flowName, store)?.editorModel)
  );
};
