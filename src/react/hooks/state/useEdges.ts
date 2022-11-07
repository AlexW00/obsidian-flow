import produce from "immer";
import { useContext } from "react";
import { Edge } from "reactflow";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { setEdges } from "src/data/setters/editor/setEdges";
import useAppModel from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";

export const useEdges = (flowName?: string): MutableHookResult<Edge[]> => {
  const _flowName = flowName || useContext(FlowNameContext);
  return [
    useAppModel((store) => selectFlow(_flowName, store)?.editorModel.edges),
    (edges: Edge[]) => {
      useAppModel.setState(
        produce((draft) => setEdges(edges, flowName, draft))
      );
    },
  ];
};
