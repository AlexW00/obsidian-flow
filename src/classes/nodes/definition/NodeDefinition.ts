import { CustomNodeContent } from "./CustomNodeContent";
import { NodeIO } from "./io/NodeIO";

export interface CustomNodeDefinition {
	io: NodeIO;
	content: CustomNodeContent;
}
