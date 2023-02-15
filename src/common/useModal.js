import React from "react";
import "./useModal.css";

export default function useModal(openButton) {
  // reusable, but open close use placement/location specific logic off of event target.
  // Can't move them around.
  const handleOpenReset = (event) => {
    event.preventDefault();
    event.target.nextSibling.showModal(); // reset dialog is the next html sibling element
  };

  const handleCloseReset = (event) => {
    event.preventDefault();
    event.target.parentNode.close(); // reset dialog is parent of close button.
  };

  const Modal = (props) => (
    <div>
      <button className="buton" onClick={handleOpenReset}>
        {openButton}
      </button>
      <dialog id="reset-password" name="reset-password">
        <>
          <button
            className="btn-cancel modal-close"
            name="close-reset-password"
            style={{ float: "right" }}
            onClick={handleCloseReset}
          >
            Cancel
          </button>
        </>
        
        <div>{props.children}</div>
      </dialog>
    </div>
  );

  return Modal;
}
