import React from "react";
import "./useModal.css";

export default function useModal(openButton) {
  // reusable, but open close use placement/location specific logic off of event target.
  // Can't move them around.
  const handleOpenDialogBox = (event) => {
    event.preventDefault();
    event.target.nextSibling.showModal(); // reset dialog is the next html sibling element
  };

  const closeDialogBox = (event) => {
    event.preventDefault();
    event.target.offsetParent.close(); // passed down as prop: close/cancel func for children
  };

  const ModalContainer = (props) => (
    <div>
      <button className="modal-button" onClick={handleOpenDialogBox}>
        {openButton}
      </button>
      <dialog id="modal-container" name="modal-container">
        <div>{props.children}</div>
      </dialog>
    </div>
  );

  return { ModalContainer, closeDialogBox };
}
