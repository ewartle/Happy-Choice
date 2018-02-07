import React from "react";

export const Panel = ({ children }) => {
  return (
    <div class = "panel panel-default">
     	<div class = "panel-heading">
	      
	        {children}
	     
        </div>
    </div>
  );
};
