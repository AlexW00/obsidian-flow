import EditorModel from "src/data/models/EditorModel";

export const findNodeIndex = (id: string, editorModel: EditorModel): number => {
  return editorModel.nodes.findIndex((n) => n.id === id);
};
