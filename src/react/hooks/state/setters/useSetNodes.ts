import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Node } from "react-flow-renderer";
import useAppModel from "../../../../data/store";

import { Setter } from "src/classes/react/StateHookResult";
import { setNodes } from "../../../../data/setters/editor/setNodes";
import produce from "immer";
import { useFlowName } from "../../context/useFlowName";
import { selectFlow } from "src/data/selectors/app/selectFlow";

export const useSetNodes = (): Setter<Node<CustomNodeData>[]> => {
  const flowName = useFlowName(),
    setter = (nodes: Node<CustomNodeData>[]) => {
      useAppModel.setState(
        produce((draft) => {
          const flow = selectFlow(flowName, draft);
          setNodes(nodes, flow.editorModel);
        })
      );
    };
  return setter;
};
