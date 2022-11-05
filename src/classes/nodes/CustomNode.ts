import { CustomNodeDefinition } from "./definition/NodeDefinition";
import { Outputs } from "./outputs/Outputs";

export interface CustomNode {
	definition: CustomNodeDefinition;
	outputs: Outputs; // the actual data of the outputs
}
