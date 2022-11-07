import { Edge } from "reactflow";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { selectEdge } from "src/data/selectors/editor/selectEdge";
import useAppModel from "src/data/store";

export const useEdge = (id: string, flowName: string): Edge => {
  return useAppModel((store) =>
    selectEdge(id, selectFlow(flowName, store)?.editorModel)
  );
};
