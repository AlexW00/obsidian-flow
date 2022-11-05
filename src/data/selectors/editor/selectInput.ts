import { OutputData } from "src/classes/nodes/outputs/Outputs";
import EditorModel from "src/data/models/EditorModel";
import { selectInputs } from "./selectInputs";

export const selectInput = (
  inputId: string,
  nodeId: string,
  editor: EditorModel
): OutputData | undefined => {
  return selectInputs(nodeId, editor)[inputId];
};
