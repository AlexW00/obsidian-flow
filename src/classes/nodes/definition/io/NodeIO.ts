import { NodeHandles } from "./handles/NodeHandles";

export interface NodeIO {
	inputs: NodeHandles;
	outputs: NodeHandles;
}
