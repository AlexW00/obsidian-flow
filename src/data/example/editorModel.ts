import { Edge, Node } from "react-flow-renderer";
import { FunctionNodeComponent } from "src/components/molecules/nodes/FunctionNode";
import { ExampleNodeComponent } from "src/components/molecules/nodes/ExampleNode";
import EditorModel from "../models/EditorModel";

const nodes = [
  {
    id: "1",
    type: "custom",
    data: {
      component: ExampleNodeComponent,
      definition: {
        io: {
          inputs: {},
          outputs: {},
        },
      },
      outputs: {},
      inputs: {},
      data: {},
    },
    position: { x: 400, y: 400 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      component: ExampleNodeComponent,
      definition: {
        io: {
          inputs: {},
          outputs: {},
        },
      },
      outputs: {},
      inputs: {},
      data: {},
    },
    position: { x: 300, y: 300 },
  },
  {
    id: "3",
    type: "custom",
    data: {
      component: FunctionNodeComponent,
      definition: {
        io: {
          inputs: {},
          outputs: {},
        },
      },
      outputs: {},
      inputs: {},
      data: {},
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    type: "custom",
    data: {
      component: FunctionNodeComponent,
      definition: {
        io: {
          inputs: {},
          outputs: {},
        },
      },
      outputs: {},
      inputs: {},
      data: {},
    },
    position: { x: 0, y: 200 },
  },
] as Node[];

const edges = [] as Edge[];

const editorModel: EditorModel = {
  nodes,
  edges,
};

export default editorModel;
