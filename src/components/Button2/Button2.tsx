import React from "react";
import "./Button2.scss";

export interface Button2Props {
  label: string;
}

const Button2: React.FC<Button2Props> = (props: Button2Props) => {
  return <button>{props.label} test butttonnnn2</button>;
};

export default Button2;
