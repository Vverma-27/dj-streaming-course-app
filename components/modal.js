import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@/style/Modal.module.css";
const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const handleClose = () => onClose();
  useEffect(() => setIsBrowser(true));
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;
  return (
    (isBrowser &&
      ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      )) ||
    null
  );
};

export default Modal;
