import React, { useEffect, useMemo } from "react";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";
import { AnyHandle } from "src/classes/nodes/definition/io/handles/types/base/AnyHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { useNodeId } from "src/react/hooks/context/useNodeId";
import { useSetData } from "src/react/hooks/state/setters/useSetData";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";
import { useSetNodeHandles } from "src/react/hooks/state/setters/useSetNodeHandles";
import { useSetOutput } from "src/react/hooks/state/setters/useSetOutput";
import {
  FunctionEditorComponent,
  FunctionExecutionMode,
} from "../code/FunctionEditor";
import { FunctionExecutorComponent } from "../code/FunctionExecutor";

export const FunctionNodeComponent = ({
  inputs,
  definition,
  data,
}: CustomNodeComponentProps): JSX.Element => {
  const id = useNodeId();
  console.log("Rendering Code Node with id" + id);
  console.log("Definition", definition);

  const setNodeDefinition = useSetDefinition();
  const setInputHandles = useSetNodeHandles(true);
  const setOutput = useSetOutput("output");
  const setData = useSetData();

  const paramsDefinition = useMemo(() => {
    return Object.keys(definition.io.inputs);
  }, [definition.io.inputs]);
  const [executionMode, setExecutionMode] =
    React.useState<FunctionExecutionMode>(FunctionExecutionMode.Idle);

  // Initial render, set node definition
  useEffect(() => {
    setNodeDefinition(CodeNodeDefinition);
  }, []);

  const handleCodeChange = (newCode: string) => {
    setData({ code: newCode });
  };

  const handleParamsChange = (newParams: string[]) => {
    const newInputHandles = newParams.reduce(
      (acc: NodeHandles, param: string) => {
        acc[param] = {
          type: AnyHandle,
        };
        return acc;
      },
      {}
    );

    setInputHandles(newInputHandles);
  };

  const handleExecuteBegin = () => {
    setExecutionMode(FunctionExecutionMode.Executing);
  };

  const handleExecuteSuccess = (result: any) => {
    setExecutionMode(FunctionExecutionMode.Success);
    setOutput(result);
  };

  const handleExecuteError = (error: Error) => {
    setExecutionMode(FunctionExecutionMode.Error);
    console.error(error);
  };

  return (
    <div>
      <FunctionEditorComponent
        params={paramsDefinition}
        code={data.code}
        mode={executionMode}
        onCodeChange={handleCodeChange}
        onParamsChange={handleParamsChange}
      />
      <FunctionExecutorComponent
        paramsDefinition={paramsDefinition}
        paramsData={Object.values(inputs)}
        code={data.code}
        onExecuteBegin={handleExecuteBegin}
        onExecuteSuccess={handleExecuteSuccess}
        onExecuteError={handleExecuteError}
      />
    </div>
  );
};

export const CodeNodeDefinition: CustomNodeDefinition = {
  name: "Function Node",
  io: {
    inputs: {
      input: {
        description: "Code Input",
        type: AnyHandle,
      },
    },
    outputs: {
      output: {
        description: "Code Output",
        type: AnyHandle,
      },
    },
  },
};
