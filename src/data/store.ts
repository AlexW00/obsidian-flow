import produce from "immer";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
} from "react-flow-renderer";
import create from "zustand";
import appModel from "./example/appModel";
import AppModel from "./models/AppModel";
import { selectFlow } from "./selectors/app/selectFlow";
import { setEdges } from "./setters/editor/setEdges";
import { setNodes } from "./setters/editor/setNodes";

export interface AppModelStore extends AppModel {
  onNodesChange: (nodeChanges: NodeChange[], flowName: string) => void;
  onEdgesChange: (edgeChanges: EdgeChange[], flowName: string) => void;
  onConnect: (connection: Connection, flowName: string) => void;
}

const useAppModel = create<AppModelStore>((set) => ({
  flows: appModel.flows,
  onNodesChange: (changes: NodeChange[], flowName) => {
    set(
      produce((draft: AppModel) => {
        const flow = selectFlow(flowName, draft),
          newNodes = applyNodeChanges(changes, flow.editorModel.nodes);
        setNodes(newNodes, flow.editorModel);
      })
    );
  },
  onEdgesChange: (changes: EdgeChange[], flowName) => {
    set(
      produce((draft: AppModel) => {
        const flow = selectFlow(flowName, draft),
          newEdges = applyEdgeChanges(changes, flow.editorModel.edges);
        setEdges(newEdges, flow.editorModel);
      })
    );
  },
  onConnect: (connection: Connection, flowName) => {
    set(
      produce((draft: AppModel) => {
        const flow = selectFlow(flowName, draft),
          newEdge = addEdge(connection, flow.editorModel.edges);
        setEdges(newEdge, flow.editorModel);
      })
    );
  },
}));

export default useAppModel;
