import { useContext } from "react";
import FlowModel from "src/data/models/FlowModel";
import { selectFlow } from "src/data/selectors/app/selectFlow";
import useAppModel from "src/data/store";
import { FlowNameContext } from "src/react/contexts/FlowContext";

export const useFlow = (flowName?: string): FlowModel | undefined => {
  const _flowName = flowName || useContext(FlowNameContext);
  return useAppModel((store) => selectFlow(_flowName, store));
};
