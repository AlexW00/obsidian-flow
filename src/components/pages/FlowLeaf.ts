import { ComponentType } from "react";
import { Editor } from "../ui/organisms/Editor";
import ReactLeaf from "./ReactLeaf";

// ~~~~~ View for a single flow ~~~~ //

export default class FlowLeaf extends ReactLeaf {
	getReactComponentType(): ComponentType<typeof Editor> {
		return Editor;
	}

	getDisplayText(): string {
		return "Flow";
	}
}
