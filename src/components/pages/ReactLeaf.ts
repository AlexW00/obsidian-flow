import { ItemView } from "obsidian";
import React from "react";
import ReactDOM from "react-dom";

// ====================================================== //
// ===================== ReactLeaf  ===================== //
// ====================================================== //

/**
 * A view that renders a React component as a leaf.
 */

export default abstract class ReactLeaf extends ItemView {
	public static readonly VIEW_TYPE = "react-view";
	private reactComponent: React.ReactElement;

	getViewType(): string {
		return ReactLeaf.VIEW_TYPE;
	}

	abstract getReactComponentType(): React.ComponentType;

	async onOpen(): Promise<void> {
		this.reactComponent = React.createElement(this.getReactComponentType());
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ReactDOM.render(this.reactComponent, (this as any).contentEl);
	}
}
