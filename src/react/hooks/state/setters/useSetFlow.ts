import produce from "immer";
import { Setter } from "src/classes/react/StateHookResult";
import AppModel from "../../../../data/models/AppModel";
import FlowModel from "../../../../data/models/FlowModel";
import { setFlow } from "../../../../data/setters/app/setFlow";
import useAppModel from "../../../../data/store";

export const useSetFlow = (): Setter<FlowModel> => {
  const setter = (flow: FlowModel) =>
    useAppModel.setState(produce((draft: AppModel) => setFlow(flow, draft)));
  return setter;
};
