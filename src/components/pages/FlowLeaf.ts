import { ComponentType } from "react";
import { Flow } from "../templates/Flow";
import ReactLeaf from "./ReactLeaf";

// ~~~~~ View for a single flow ~~~~ //

export default class FlowLeaf extends ReactLeaf {
	getReactComponentType(): ComponentType<typeof Flow> {
		return Flow;
	}

	getDisplayText(): string {
		return "Flow";
	}
}
