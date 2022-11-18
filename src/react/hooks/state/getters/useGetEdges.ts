import { Edge } from "react-flow-renderer";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import useAppModel from "../../../../data/store";
import { useFlowName } from "../../context/useFlowName";

export const useGetEdges = (): Edge[] => {
  const flowName = useFlowName(),
    edges = useAppModel(
      (state) => selectFlow(flowName, state)?.editorModel.edges
    );
  return edges;
};
