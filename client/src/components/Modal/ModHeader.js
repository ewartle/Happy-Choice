import React from "react";

export const ModHeader = ({ children }) =>
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {children}
    </div>;