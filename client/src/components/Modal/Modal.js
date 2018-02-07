import React from "react";

export const Modal = ({ children }) =>
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      {children}
    </div>
  </div>
</div>;