import FlowModel from "../../../../data/models/FlowModel";
import { selectFlow } from "../../../../data/selectors/app/selectFlow";
import useAppModel from "../../../../data/store";
import { useFlowName } from "../../context/useFlowName";

export const useGetFlow = (): FlowModel => {
  const flowName = useFlowName(),
    flow = useAppModel((store) => selectFlow(flowName, store));
  return flow;
};
