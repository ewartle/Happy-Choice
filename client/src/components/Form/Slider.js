import React from "react";
import "./Slider.css";

export const Slider  = props =>

<div className="slidecontainer">
  <input type="range" min="1" max="100" value="50" class="slider" id="myRange" {...props} />
  
</div>




