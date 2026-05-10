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
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current.focus();
    return () => {
      document.body.style.overflow = "";
      restoreFocusRef.current.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
        return;
      }

      if (event.key === "Tab") {
        const modal = document.querySelector(".modal");
        if (!modal) return;

        const focusable = modal.querySelectorAll(
          'button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onCancel]);

  const onClick = (e) => {
    if (e.target === overlayRef.current) {
      onCancel();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      className="modal-overlay"
      onClick={onClick}
      ref={overlayRef}
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
