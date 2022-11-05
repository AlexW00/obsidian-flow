import { Edge, Node } from "reactflow";
import { ExampleNode } from "src/components/ui/molecules/nodes/ExampleNode";
import EditorModel from "../models/EditorModel";

const nodes = [
	{
		id: "1",
		type: "input",
		data: { label: "Input" },
		position: { x: 250, y: 25 },
	},
	{
		id: "2",
		data: { label: "Default" },
		position: { x: 100, y: 125 },
	},
	{
		id: "3",
		type: "output",
		data: { label: "Output" },
		position: { x: 250, y: 250 },
	},
	{
		id: "4",
		type: "custom",
		data: {
			definition: ExampleNode,
			outputs: {},
		},
		position: { x: 400, y: 400 },
	},
	{
		id: "5",
		type: "custom",
		data: {
			definition: ExampleNode,
			outputs: {},
		},
		position: { x: 300, y: 300 },
	},
] as Node[];

const edges = [
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e2-3", source: "2", target: "3" },
] as Edge[];

const editorModel: EditorModel = {
	nodes,
	edges,
};

export default editorModel;
