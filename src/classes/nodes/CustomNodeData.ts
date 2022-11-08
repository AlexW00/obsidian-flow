import { CustomNodeComponent } from "./definition/CustomNodeContent";
import { CustomNodeDefinition } from "./definition/NodeDefinition";
import { Inputs } from "./outputs/Inputs";
import { Outputs } from "./outputs/Outputs";

export interface CustomNodeData {
  component: CustomNodeComponent;
  definition: CustomNodeDefinition;
  outputs: Outputs;
  inputs: Inputs;
}
