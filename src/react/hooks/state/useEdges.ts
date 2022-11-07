import produce from "immer";
import { Edge } from "reactflow";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { setEdges } from "src/data/setters/editor/setEdges";
import useAppModel from "src/data/store";

export const useEdges = (flowName: string): MutableHookResult<Edge[]> => {
  const edges = useAppModel(
    (store) => selectFlow(flowName, store)?.editorModel.edges
  );
  const setter = (edges: Edge[]) => {
    useAppModel.setState(produce((draft) => setEdges(edges, flowName, draft)));
  };
  return [edges, setter];
};
