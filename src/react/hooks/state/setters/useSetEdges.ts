import produce from "immer";
import { Edge } from "react-flow-renderer";
import { Setter } from "src/classes/react/StateHookResult";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { setEdges } from "../../../../data/setters/editor/setEdges";
import useAppModel from "../../../../data/store";
import { useFlowName } from "../../context/useFlowName";

export const useSetEdges = (): Setter<Edge[]> => {
  const flowName = useFlowName(),
    setter = (edges: Edge[]) => {
      useAppModel.setState(
        produce((draft) => {
          const flow = selectFlow(flowName, draft);
          setEdges(edges, flow.editorModel);
        })
      );
    };
  return setter;
};
