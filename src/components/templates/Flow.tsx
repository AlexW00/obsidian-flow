import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { FlowNameContext } from "src/react/contexts/FlowNameContext";
import { max } from "src/styles/layout";
import { Editor } from "../organisms/Editor";

export const Flow = () => {
  return (
    <div style={max}>
      <h1>Flow XY</h1>
      <FlowNameContext.Provider value="example-flow">
        <ReactFlowProvider>
          <Editor />
        </ReactFlowProvider>
      </FlowNameContext.Provider>
    </div>
  );
};
