import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.style.scss";

interface IModalProps {
  open: boolean;
  onClose?: () => void;
}

const Modal: React.FC<IModalProps> = ({ open = false, onClose, children }) => {
  if (!open) return null;

  const content = (
    <>
      <ModalBackdrop handleOnClickBackdrop={onClose} />
      <div className="modal__container">
        <div className="modal__content">{children}</div>
      </div>
    </>
  );

  const modalRoot = document.getElementById("modal-root");
  return modalRoot ? ReactDOM.createPortal(content, modalRoot) : null;
};

export default Modal;

const ModalBackdrop: React.FC<{ handleOnClickBackdrop?: () => void }> = ({
  handleOnClickBackdrop,
}) => {
  useEffect(() => {
    document.body.classList.add("model__opened");
    return () => {
      document.body.classList.remove("model__opened");
    };
  }, []);

  return <div className="modal__backdrop" onClick={handleOnClickBackdrop} />;
};
