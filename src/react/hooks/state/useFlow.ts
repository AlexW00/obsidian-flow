import produce from "immer";
import { MutableHookResult } from "src/classes/react/StateHookResult";
import AppModel from "src/data/models/AppModel";
import FlowModel from "src/data/models/FlowModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import { setFlow } from "src/data/setters/app/setFlow";
import useAppModel from "src/data/store";

export const useFlow = (flowName: string): MutableHookResult<FlowModel> => {
  const flow = useAppModel((store) => selectFlow(flowName, store)),
    setter = (flow: FlowModel) =>
      useAppModel.setState(produce((draft: AppModel) => setFlow(flow, draft)));
  return [flow, setter];
};
