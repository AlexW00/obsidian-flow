import { OutputData } from "src/classes/nodes/outputs/Outputs";
import EditorModel from "src/data/models/EditorModel";
import { selectOutputs } from "./selectOutputs";

export const selectOutput = (
  outputId: string,
  nodeId: string,
  editor: EditorModel
): OutputData | undefined => {
  return selectOutputs(nodeId, editor)[outputId];
};
