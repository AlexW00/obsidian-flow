import React from "react";
import ReactJson from "react-json-view";

export const ObjectViewerComponent = ({
  object,
}: {
  object: Record<string, unknown>;
}) => {
  return (
    <div
      style={{
        maxWidth: "25em",
        maxHeight: "50em",
      }}
    >
      <ReactJson src={object} enableClipboard={false} />
    </div>
  );
};
