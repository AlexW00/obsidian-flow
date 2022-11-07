import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { selectNode } from "src/data/selectors/editor/selectNode";
import { Node } from "reactflow";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import useAppModel from "src/data/store";

export const useNode = (
  nodeId: string,
  flowName: string
): Node<CustomNodeData> | undefined => {
  return useAppModel((store) =>
    selectNode(nodeId, selectFlow(flowName, store)?.editorModel)
  );
};
