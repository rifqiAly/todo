import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie";
import animationData from "../lotties/completed.json";
export const TodoList = ({
  task,
  toggleComplete,
  handleDelete,
  handleEdit,
}) => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [editable, setEditable] = useState(true);
  const [isStopped, setIsStopped] = useState(true);
  const [direction, setDirection] = useState(1);

  const clickHandler = () => {
    if (!isStopped) {
      setDirection(direction * -1);
    }
    setIsStopped(false);
    if (editable) {
      setEditable(false);
    } else {
      setTimeout(() => {
        setEditable(true);
      }, 4000);
    }
  };

  return (
    <div
      className="Todo"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => {
          toggleComplete(task.id);
          clickHandler();
        }}
        className={`${task.completed ? "completed" : "incompleted"}`}
        style={{
          display: "flex",
          flexDirection: "row",
          height: 100,
          alignItems: "center",
          position: "relative",
        }}
      >
        <span className="tooltip">You can click me to complete the task.</span>
        {task.task}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: 100,
          alignItems: "center",
        }}
      >
        <Lottie
          width={100}
          options={defaultOptions}
          isStopped={isStopped}
          isPaused={false}
          direction={direction}
        />
        {editable ? (
          <div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(task.id)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(task.id)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
