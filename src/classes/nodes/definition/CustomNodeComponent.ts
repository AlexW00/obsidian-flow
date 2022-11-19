import { FunctionComponent } from "react";
import { Inputs } from "../outputs/Inputs";
import { Outputs } from "../outputs/Outputs";
import { CustomNodeDefinition } from "./NodeDefinition";

export type CustomNodeComponent = FunctionComponent<CustomNodeComponentProps>;

export type CustomNodeComponentProps = {
  definition: CustomNodeDefinition;
  outputs: Outputs;
  inputs: Inputs;
  data: any;
};
