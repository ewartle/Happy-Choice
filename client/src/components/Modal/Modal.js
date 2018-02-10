import React from "react";

<<<<<<< HEAD
export const Modal = ({ children, props }) =>
<div {props} class="modal fade" tabindex="-1" role="dialog">
=======
export const Modal = ({ children }) =>
<div class="modal fade" tabindex="-1" role="dialog">
>>>>>>> cdc103a12f55c700dddf181e7f0bc41b9fa44786
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      {children}
    </div>
  </div>
</div>;