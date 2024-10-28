import React from "react";
import { cn } from "src/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full flex justify-center md:px-24 px-4", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
