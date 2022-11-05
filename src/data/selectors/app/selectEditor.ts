import AppModel from "src/data/models/AppModel";
import EditorModel from "src/data/models/EditorModel";

export const selectEditor = (
  flowName: string,
  app: AppModel
): EditorModel | undefined => {
  return app.flows.find((f) => f.name === flowName)?.editorModel;
};
