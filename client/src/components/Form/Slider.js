import React from "react";
import "./Slider.css";

export const Slider  = props =>

<div class="slidecontainer">
 <input class="slider" {...props} />
 <p>Value: <span class="demo"></span></p>
</div>