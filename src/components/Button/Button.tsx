import React from "react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <button>{props.label} test butttonnnn</button>;
};

export default Button;
