import { Edge } from "reactflow";
import { selectEdge } from "src/data/selectors/editor/selectEdge";
import { useFlow } from "./useFlow";

export const useEdge = (
  edgeId: string,
  flowName?: string
): Edge | undefined => {
  return selectEdge(edgeId, useFlow(flowName)?.editorModel);
};
