import React, { memo, useEffect, useRef, useState } from "react";

export type DynamicInputProps = {
  value: string | number;
  onChange: (newValue: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  style?: React.CSSProperties;
  type?: "text" | "number";
};

// An input field, that dynamically resizes to fit its content.
// Thanks for the idea @T
// and https://stackoverflow.com/questions/65011555/auto-scaling-input-to-width-of-value-in-react

export const DynamicInputComponent = memo(
  (props: DynamicInputProps): JSX.Element => {
    const refSpan = useRef<HTMLSpanElement>();
    const [width, setWidth] = useState(0);

    useEffect(() => {
      setWidth(refSpan.current.offsetWidth);
    }, [props.value]);

    return (
      <div style={props.style}>
        <span
          ref={refSpan}
          style={{
            position: "absolute",
            visibility: "hidden",
            whiteSpace: "pre",
          }}
        >
          {props.value}
        </span>

        <input
          className="code-font nodrag"
          type={props.type}
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
            width: width,
            minWidth: "1ch",
          }}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </div>
    );
  }
);
