import { CustomNodeDefinition } from "./definition/NodeDefinition";
import { Inputs } from "./outputs/Inputs";
import { Outputs } from "./outputs/Outputs";

export interface CustomNodeData {
	definition: CustomNodeDefinition;
	outputs: Outputs;
	inputs: Inputs;
}
