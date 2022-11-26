import { Edge, Node } from "react-flow-renderer";
import { FunctionNodeComponent } from "src/components/organisms/nodes/FunctionNode";
import { ExampleNodeComponent } from "src/components/organisms/nodes/ExampleNode";
import EditorModel from "../models/EditorModel";
import { ViewerNodeComponent } from "src/components/organisms/nodes/ViewerNode";
import { TextInputNodeComponent } from "src/components/organisms/nodes/TextInputNode";

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
      component: TextInputNodeComponent,
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
  {
    id: "5",
    type: "custom",
    data: {
      component: ViewerNodeComponent,
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
    position: { x: 0, y: 350 },
  },
] as Node[];

const edges = [] as Edge[];

const editorModel: EditorModel = {
  nodes,
  edges,
};

export default editorModel;
