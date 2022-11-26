import React from "react";

export const WebViewerComponent = ({ url }: { url: string }) => {
  return (
    // lol
    <iframe
      src={url}
      style={{
        width: "100em",
        height: "75em",
      }}
    />
  );
};
