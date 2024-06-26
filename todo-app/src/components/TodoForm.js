import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const TodoForm = ({ addTodo, handleMode }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form
      className="TodoForm"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div>
        <button
          type="button"
          style={{
            height: 40,
            background: "#8758ff",
            color: "#fff",
            border: "none",
            padding: " 0.55rem",
            cursor: "pointer",
            borderRadius: 50,
          }}
          onClick={()=> handleMode('search')}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ cursor: "pointer" }}
          />{" "}
          Search
        </button>
      </div>
      <div>
        <input
          type="text"
          className="todo-input"
          placeholder="What will you be doing?"
          value={value}
          required
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit" className="todo-btn">
          <FontAwesomeIcon icon={faPlus} style={{ cursor: "pointer" }} /> Add
        </button>
      </div>
    </form>
  );
};
