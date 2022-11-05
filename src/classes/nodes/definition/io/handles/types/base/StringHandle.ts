import NodeHandleType from "../NodeHandleType";
import { AnyHandle } from "./AnyHandle";

export const StringHandle: NodeHandleType = {
	name: "string",
	color: "#00ff00",
	allowedInputs: [AnyHandle],
};
