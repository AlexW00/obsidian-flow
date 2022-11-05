/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import produce from "immer";
import { Connection, EdgeChange, NodeChange } from "reactflow";
import { OutputData } from "src/classes/nodes/outputs/Outputs";
import { StoreApi, UseBoundStore } from "zustand";
import AppModel from "../models/AppModel";
import FlowModel from "../models/FlowModel";
import { setFlow } from "./app/setFlow";
import { setConnection } from "./editor/setConnection";
import { setEdgeChange } from "./editor/setEdgeChange";
import { setNodeChange } from "./editor/setNodeChange";
import { setOutput } from "./editor/setOutput";

type AppModelStore = UseBoundStore<StoreApi<AppModel>>;

export const Setters = {
  setFlow: (flow: FlowModel, appModel: AppModelStore) => {
    appModel.setState(produce((draft: AppModel) => setFlow(flow, draft)));
  },

  setNodeChanges: (
    changes: NodeChange[],
    flowName: string,
    appModel: AppModelStore
  ) => {
    appModel.setState(
      produce((draft: AppModel) => setNodeChange(changes, flowName, draft))
    );
  },

  setEdgeChanges: (
    changes: EdgeChange[],
    flowName: string,
    appModel: AppModelStore
  ) => {
    appModel.setState(
      produce((draft: AppModel) => setEdgeChange(changes, flowName, draft))
    );
  },

  setConnection: (
    connection: Connection,
    flowName: string,
    appModel: AppModelStore
  ) => {
    appModel.setState(
      produce((draft: AppModel) => {
        setConnection(connection, flowName, draft);
      })
    );
  },

  setOutput: (
    output: OutputData,
    id: string,
    nodeId: string,
    flowName: string,
    appModel: AppModelStore
  ) => {
    appModel.setState(
      produce((draft: AppModel) => {
        setOutput(output, id, nodeId, flowName, draft);
      })
    );
  },
};
