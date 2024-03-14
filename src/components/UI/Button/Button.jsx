import React from "react";
import "./Button.css";

const Button = (props) => (
  <button className="` button ${props.className}`">{props.children}</button>
);

export default Button;
