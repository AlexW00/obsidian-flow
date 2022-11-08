import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";
import AppModel from "src/data/models/AppModel";
import { setNodeHandle } from "./setNodeHandle";

export const setNodeHandles = (
  isInput: boolean,
  handles: NodeHandles,
  nodeId: string,
  flowName: string,
  appModel: AppModel
): void => {
  // const editorModel = selectFlow(flowName, appModel).editorModel;
  // const node = selectNode(nodeId, editorModel.nodes);
  // const io = node?.data?.definition?.io;
  // if (io) {
  //   if (isInput) io.inputs = handles;
  //   else io.outputs = handles;
  // }
  Object.keys(handles).forEach((handleName) => {
    setNodeHandle(
      isInput,
      handleName,
      handles[handleName],
      nodeId,
      flowName,
      appModel
    );
  });
};
