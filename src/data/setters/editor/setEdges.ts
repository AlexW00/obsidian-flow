import { Edge } from "reactflow";
import AppModel from "src/data/models/AppModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { addEdge } from "./addEdge";
import { deleteEdge } from "./deleteEdge";

export const setEdges = (
  edges: Edge[],
  flowName: string,
  appModel: AppModel
): void => {
  const editorModel = selectFlow(flowName, appModel)?.editorModel;

  // delete edges that are not in the new list
  editorModel.edges
    // find them
    ?.map((oldEdge) => {
      if (edges.indexOf(oldEdge) === -1)
        return () => deleteEdge(oldEdge, editorModel);
    })
    // delete them
    .forEach((deleteEdge) => deleteEdge && deleteEdge());

  // add all new edges
  edges.forEach((edge) => addEdge(edge, editorModel));
};
