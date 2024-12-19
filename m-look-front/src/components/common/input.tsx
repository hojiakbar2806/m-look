"use client";

import React, { useState } from "react";
import { cn } from "src/utils/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = React.memo(
  ({ label, className, ...props }) => {
    const [value, setValue] = useState(props.value || "");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <label
        htmlFor={label}
        className="w-full relative border border-gray-300 rounded "
      >
        <input
          id={label}
          {...props}
          value={value}
          onChange={handleChange}
          className={cn(
            "peer w-full focus:border-primary autofill:bg-white border-none bg-transparent p-2.5 outline-none",
            className
          )}
        />
        <span
          className={cn(
            "bg-white absolute  peer-focus:top-0 left-3 -translate-y-1/2 text-gray-500 transition-all duration-200",
            value ? "top-0" : " top-1/2"
          )}
        >
          {label}
        </span>
      </label>
    );
  }
);
Input.displayName = "Input";
export default Input;
