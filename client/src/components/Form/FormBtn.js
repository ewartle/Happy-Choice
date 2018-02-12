import React from "react";
import "./Slider.css";

export const FormBtn = props =>
  <button {...props} className="btn">
    {props.children}
  </button>;
