"use client";

import React, { useState } from "react";
import clx from "classnames";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = React.memo(
  ({ label, className, ...props }) => {
    const [value, setValue] = useState(props.value || "");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <label
        htmlFor={label}
        className={clx(
          "relative w-full border border-gray-300 rounded",
          className
        )}
      >
        <textarea
          id={label}
          {...props}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          className={clx(
            "peer w-full p-2.5 outline-none border-none bg-transparent autofill:bg-white focus:border-primary",
            className
          )}
        />
        <span
          className={clx(
            "absolute left-3 bg-white text-gray-500 transition-all duration-200 top-2 peer-focus:-top-3",
            value ? "-top-3 text-primary" : "top-1/2"
          )}
        >
          {label}
        </span>
      </label>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
