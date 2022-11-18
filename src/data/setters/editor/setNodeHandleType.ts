import NodeHandleType from "src/classes/nodes/definition/io/handles/types/NodeHandleType";
import AppModel from "../../models/AppModel";
import { setNodeHandle } from "./setNodeHandle";

export const setNodeHandleType = (
  isInput: boolean,
  name: string,
  type: NodeHandleType,
  nodeId: string,
  flowName: string,
  appModel: AppModel
): void =>
  setNodeHandle(isInput, name, { type, name }, nodeId, flowName, appModel);
