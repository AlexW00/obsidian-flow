import { NodeIO } from "./io/NodeIO";

export interface CustomNodeDefinition {
  name: string;
  io: NodeIO;
}
