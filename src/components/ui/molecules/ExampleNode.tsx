import React, { useContext } from "react";
import useStore from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";
import { CustomNodeDefinition, ConnectionDefinition } from "./CustomNode";

export const CustomNodeComponent = (id: string) => {
	const flowName = useContext(FlowNameContext);
	const store = useStore();
	const inputs = store.getInputs(flowName, id);
	const outputs = store.getOutputs(flowName, id);
	const setOutputs = store.setOutputs;

	console.log("CustomNodeComponent", id, inputs, outputs);

	const onClickButton = () => {
		console.log("onClickButton", outputs);
		const newOutputs = { ...outputs };
		newOutputs.output1 = (outputs.output1 ?? "") + "a";
		setOutputs(flowName, id, newOutputs);
	};
	return (
		<div>
			<h3>MyCustomNode</h3>
			<div>Input: {inputs?.input1 ?? "empty"}</div>
			<div>Output: {outputs?.output1 ?? "empty"}</div>
			<button onClick={onClickButton}>Increment</button>
		</div>
	);
};

export const ExampleNode: CustomNodeDefinition<
	ConnectionDefinition,
	ConnectionDefinition
> = {
	io: {
		inputs: {
			input1: {
				name: "Input 1",
				type: "string",
			},
		},
		outputs: {
			output1: {
				name: "Output 1",
				type: "string",
			},
		},
	},
	content: (_io, id) => CustomNodeComponent(id),
};
