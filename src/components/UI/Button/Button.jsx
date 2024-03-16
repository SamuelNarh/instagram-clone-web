import React from "react";
import "./Button.css";

const Button = (props) => (
  <button
    className={` button ${props.className}`}
    onClick={props.onClick}
    type={props.type || "button"}
  >
    {props.children}
  </button>
);

export default Button;
