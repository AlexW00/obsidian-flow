import { highlight, languages } from "prismjs";
import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { CustomNodeComponentProps } from "src/classes/nodes/definition/CustomNodeComponent";
import { NodeHandles } from "src/classes/nodes/definition/io/handles/NodeHandles";
import { AnyHandle } from "src/classes/nodes/definition/io/handles/types/base/AnyHandle";
import { CustomNodeDefinition } from "src/classes/nodes/definition/NodeDefinition";
import { useNodeId } from "src/react/hooks/context/useNodeId";
import { useSetData } from "src/react/hooks/state/setters/useSetData";
import { useSetDefinition } from "src/react/hooks/state/setters/useSetDefinition";
import { useSetOutput } from "src/react/hooks/state/setters/useSetOutput";
import { useCodeExecutor } from "src/react/hooks/util/useCodeExecutor";
import { wrapContent } from "src/styles/layout";

export const FunctionNodeComponent = ({
  inputs,
  definition,
  data,
}: CustomNodeComponentProps) => {
  const id = useNodeId();
  console.log("Rendering Code Node with id" + id);
  console.log("Definition", definition);

  const setNodeDefinition = useSetDefinition();
  const setOutput = useSetOutput("output");
  const setData = useSetData();
  const codeExecutor = useCodeExecutor(...Object.keys(definition.io.inputs));
  const [paramInput, setParamInput] = React.useState("");
  console.log("ParamInput", definition.io.inputs);

  const [didExecute, setDidExecute] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(null);

  useEffect(() => {
    setNodeDefinition(CodeNodeDefinition);
    setParamInput(Object.keys(CodeNodeDefinition.io.inputs).join(", "));
  }, []);

  const executeCode = () => {
    const { value, error } = codeExecutor(
      data.code,
      ...Object.keys(definition.io.inputs).map((input) => inputs[input])
    );
    setOutput(value);

    setDidExecute(true);
    setError(error);
  };

  const onTextChange = (newCode: string) => {
    console.log(newCode);
    setData({ code: newCode });
  };

  const onFunctionParamsChanged = (newParams: string) => {
    const params: string[] = newParams
        .split(",")
        .map((param) => param.trim())
        .filter((param) => param.length > 0),
      nodeHandles = params.reduce((acc: NodeHandles, param: string) => {
        acc[param] = {
          type: AnyHandle,
        };
        return acc;
      }, {}),
      newDefinition: CustomNodeDefinition = {
        io: {
          inputs: nodeHandles,
          outputs: definition.io.outputs,
        },
      };

    setNodeDefinition(newDefinition);
  };

  return (
    <div>
      <h3>Function Node</h3>
      <div
        style={{
          ...getStyle(didExecute, error),
        }}
      >
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            padding: "0.5em",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div className="code-font">{"("}</div>
            <input
              className="code-font nodrag"
              style={{
                border: "none",
                outline: "none",
                cursor: "text",
                padding: "0",
                display: "flex",
                alignItems: "center",
                fontSize: "inherit",
                fontFamily: "inherit",
                lineHeight: "inherit",
              }}
              onBlur={() => onFunctionParamsChanged(paramInput)}
              value={paramInput}
              onChange={(e) => setParamInput(e.target.value)}
            />
            <div className="code-font">{") => {"}</div>
          </div>
          <Editor
            className="code-font nodrag"
            value={data.code ?? ""}
            onValueChange={onTextChange}
            highlight={(code) => highlight(code, languages.js, "js")}
            style={{
              minWidth: "10rem",
              minHeight: "3rem",
              marginLeft: "0.1rem",
              fontSize: "inherit",
              fontFamily: "inherit",
            }}
          />

          <div className="code-font">{"}"}</div>
        </div>

        {error && (
          <div
            style={{
              marginTop: "0.25rem",
              width: "100%",
              backgroundColor: "rgba(178, 34, 34, 0.2)",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              {error.message.toString()}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={executeCode}
        style={{
          marginTop: "10px",
        }}
      >
        Run
      </button>
    </div>
  );
};

export const CodeNodeDefinition: CustomNodeDefinition = {
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

const getStyle = (didExecute: boolean, error?: Error): React.CSSProperties => {
  if (error) return errorStyle;
  else if (didExecute) return successStyle;
  else return defaultStyle;
};

const successStyle: React.CSSProperties = {
  border: "1px solid rgba(75, 181, 67, 0.7)",
  ...wrapContent,
};

const errorStyle: React.CSSProperties = {
  border: "1px solid rgba(178, 34, 34, 0.7)",
  ...wrapContent,
};

const defaultStyle: React.CSSProperties = {
  border: "1px solid rgba(0, 0, 0, 0.7)",
  ...wrapContent,
};
