import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./modal";

import "./index.css";

export const ModalExperiment = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");

  const onSubmit = () => {
    console.log("submitted");
    setShowModal(false);
  };

  const onCancel = () => {
    console.log("cancelled");
    setShowModal(false);
  };

  const onShow = (content) => {
    setContent(content);
    setShowModal(true);
  };

  return (
    <div className="page">
      <button onClick={() => onShow("1")}>1</button>
      <button onClick={() => onShow("2")}>2</button>
      <button onClick={() => onShow("3")}>3</button>
      <button onClick={() => onShow("4")}>4</button>
      <button onClick={() => onShow("5")}>5</button>
      <button onClick={() => onShow("6")}>6</button>
      <button onClick={() => onShow("7")}>7</button>
      <button onClick={() => onShow("8")}>8</button>
      <button onClick={() => onShow("9")}>9</button>
      <button onClick={() => onShow("10")}>10</button>
      <button onClick={() => onShow("11")}>11</button>
      <button onClick={() => onShow("12")}>12</button>
      <button onClick={() => onShow("13")}>13</button>
      <button onClick={() => onShow("14")}>14</button>
      <button onClick={() => onShow("15")}>15</button>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      <div>Extra</div>
      {showModal
        ? createPortal(
            <Modal
              title={"modal in portal"}
              content={content}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />,
            document.body,
          )
        : null}
    </div>
  );
};
