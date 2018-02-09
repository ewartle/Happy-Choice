import React from "react";

export const Panel = ({ children }) => {
  return (
    <div className = "panel panel-default">
     	<div className = "panel-heading">
	      
	        {children}
	     
        </div>
    </div>
  );
};
