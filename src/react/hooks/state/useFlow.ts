import produce from "immer";
import { useContext } from "react";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import AppModel from "src/data/models/AppModel";
import FlowModel from "src/data/models/FlowModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { setFlow } from "src/data/setters/app/setFlow";
import useAppModel from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";

export const useFlow = (flowName?: string): MutableHookResult<FlowModel> => {
  const _flowName = flowName || useContext(FlowNameContext);
  return [
    useAppModel((store) => selectFlow(_flowName, store)),
    (flow: FlowModel) =>
      useAppModel.setState(produce((draft: AppModel) => setFlow(flow, draft))),
  ];
};
