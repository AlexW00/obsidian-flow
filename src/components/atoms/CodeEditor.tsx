/* eslint-disable @typescript-eslint/no-empty-function */
import { highlight, languages } from "prismjs";
import React, { memo, useState } from "react";
import Editor from "react-simple-code-editor";

export type CodeEditorProps = {
  code: string;
  onChange?: (newCode: string) => void;
  onBlur?: (newCode: string) => void;
  onFocus?: () => void;
};

export const CodeEditorComponent = memo(
  ({ code, onChange, onBlur, onFocus }: CodeEditorProps): JSX.Element => {
    const [codeBuffer, setCodeBuffer] = useState(code ?? "");

    const handleCodeChange = (newCode: string) => {
      setCodeBuffer(newCode);
      if (onChange) onChange(newCode);
    };

    const handleBlur = () => {
      if (onBlur) onBlur(codeBuffer);
    };

    const handleFocus = () => {
      if (onFocus) onFocus();
    };

    return (
      <Editor
        className="code-font nodrag"
        value={codeBuffer}
        onValueChange={handleCodeChange}
        highlight={(code) => highlight(code, languages.js, "js")}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{
          minWidth: "10rem",
          minHeight: "1ch",
          fontSize: "inherit",
          fontFamily: "inherit",
        }}
      />
    );
  }
);
