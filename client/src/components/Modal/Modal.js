import React from "react";

export const Modal = ({ children, props }) =>
<div {props} class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      {children}
    </div>
  </div>
</div>;