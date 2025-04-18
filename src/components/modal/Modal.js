import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default function Modal({ children, isOpen, onClose }) {
  const elRef = useRef(null);

  // Создаем div только на клиенте
  if (elRef.current === null && typeof document !== "undefined") {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (!elRef.current) return;
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;

    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  if (!isOpen || !elRef.current) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div style={styles.backdrop} onClick={handleBackdropClick}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, elRef.current);
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#243642",
    padding: "2rem",
    borderRadius: "8px",
    position: "relative",
    minWidth: "300px",

    maxWidth: "600px",
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};
