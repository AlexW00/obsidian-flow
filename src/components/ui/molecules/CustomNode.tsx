import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { Handle, NodeProps, Position, useUpdateNodeInternals } from "reactflow";

export type OutputData = any;

export type Outputs = Record<string, OutputData>;

export type Inputs = Record<string, OutputData>;

export interface CustomNodeData {
	definition: CustomNodeDefinition<ConnectionDefinition, ConnectionDefinition>;
	outputs: Outputs; // the actual data of the outputs
}

export interface NodeConnectorDefinition {
	name: string;
	type: string;
}

export interface ConnectionDefinition {
	[key: string]: NodeConnectorDefinition;
}

export interface CustomNodeIO<
	I extends ConnectionDefinition,
	O extends ConnectionDefinition
> {
	inputs: I;
	outputs: O;
}

export interface CustomNodeDefinition<
	I extends ConnectionDefinition,
	O extends ConnectionDefinition
> {
	io: CustomNodeIO<I, O>;
	content: CustomNodeContent<CustomNodeIO<I, O>>;
}

export type CustomNodeContent<
	T extends CustomNodeIO<ConnectionDefinition, ConnectionDefinition>
> = (io: T, id: string) => JSX.Element;

export const CustomNodeComponent: FunctionComponent<
	NodeProps<CustomNodeData>
> = (props: PropsWithChildren<NodeProps<CustomNodeData>>, _context?: any) => {
	const calculateHandleTopOffset = (
		index: number,
		numHandles: number
	): string => {
		const offset = 100 / (numHandles + 1);
		return `${offset * (index + 1)}%`;
	};

	const mapHandles = (
		io: ConnectionDefinition,
		isInput: boolean
	): JSX.Element[] => {
		const keys = Object.keys(io);

		const updateNodeInternals = useUpdateNodeInternals();

		// first execute
		useEffect(() => {
			updateNodeInternals(props.id);
		}, []);

		return keys.map((key, index) => {
			const handleTopOffset = calculateHandleTopOffset(index, keys.length);
			return (
				<Handle
					key={key}
					id={key}
					type={isInput ? "target" : "source"}
					position={isInput ? Position.Left : Position.Right}
					style={{ top: handleTopOffset }}
				/>
			);
		});
	};

	console.log("CustomNodeComponent", props.data);

	return (
		<div className="custom-node react-flow__node-default">
			{mapHandles(props.data.definition.io.inputs, true)}

			<div>
				{props.data.definition.content(props.data.definition.io, props.id)}
			</div>

			{mapHandles(props.data.definition.io.outputs, false)}
		</div>
	);
};
