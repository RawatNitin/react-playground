import { useEffect, useRef } from "react";
import "./modal.css";

export const Modal = ({
  title,
  content,
  onCancel,
  onSubmit,
  restoreFocusRef,
}) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current.focus();
    return () => {
      document.body.style.overflow = "";
      restoreFocusRef.current.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyPress = (event) => {
      console.log(event.key);
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      className="modal-overlay"
    >
      <div className="modal">
        <header className="header">
          <b id="modal-title">{title}</b>
          <button
            ref={closeButtonRef}
            id="modal-content"
            className="cross"
            onClick={onCancel}
          >
            X
          </button>
        </header>
        <main>{content}</main>
        <footer className="footer">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onSubmit}>Submit</button>
        </footer>
      </div>
    </div>
  );
};
