import React, { useState } from "react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [count, setCount] = useState("1");
  const change = () => {
    setCount("3");
  };
  return (
    <button onClick={change}>
      {props.label} test butttonnnn{count}
    </button>
  );
};

export default Button;
