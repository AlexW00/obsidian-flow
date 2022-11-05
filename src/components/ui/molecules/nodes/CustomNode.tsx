import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { Handle, NodeProps, Position, useUpdateNodeInternals } from "reactflow";
import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";

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

	const mapHandles = (io: NodeHandles, isInput: boolean): JSX.Element[] => {
		const keys = Object.keys(io);

		const updateNodeInternals = useUpdateNodeInternals();

		// first execute
		useEffect(() => {
			updateNodeInternals(props.id);
		}, []);

		return keys.map((key, index) => {
			const handleTopOffset = calculateHandleTopOffset(index, keys.length);
			const type = io[key].type;
			return (
				<Handle
					key={key}
					id={key}
					type={isInput ? "target" : "source"}
					position={isInput ? Position.Left : Position.Right}
					style={{
						top: handleTopOffset,
						background: type.color,
					}}
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
