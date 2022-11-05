import React from "react";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { max } from "src/styles/layout";
import { Editor } from "../ui/organisms/Editor";

export const Flow = () => {
	return (
		<div style={max}>
			<h1>Flow XY</h1>
			<FlowNameContext.Provider value="example-flow">
				<Editor />
			</FlowNameContext.Provider>
		</div>
	);
};
