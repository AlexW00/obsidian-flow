import { useContext } from "react";
import { Edge } from "reactflow";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectEdge } from "src/data/selectors/editor/selectEdge";
import useAppModel from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";

export const useEdge = (id: string, flowName?: string): Edge => {
  const _flowName = flowName || useContext(FlowNameContext);
  return useAppModel((store) =>
    selectEdge(id, selectFlow(_flowName, store)?.editorModel)
  );
};
