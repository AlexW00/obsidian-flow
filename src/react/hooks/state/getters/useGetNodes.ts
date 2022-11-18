import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "react-flow-renderer";
import useAppModel from "../../../../data/store";
import { useFlowName } from "../../context/useFlowName";
import { selectFlow } from "src/data/selectors/app/selectFlow";

export const useGetNodes = (): Node<CustomNodeData>[] => {
  const flowName = useFlowName(),
    nodes = useAppModel(
      (state) => selectFlow(flowName, state)?.editorModel.nodes
    );
  return nodes;
};
