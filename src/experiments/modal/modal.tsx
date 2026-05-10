import { useEffect } from "react";
import "./modal.css";

export const Modal = ({ title, content, onCancel, onSubmit }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="header">
          <b>{title}</b>
          <div className="cross" onClick={onCancel}>
            X
          </div>
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
