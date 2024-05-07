import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const SearchForm = ({ searchTodo, handleMode }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTodo(value);
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
        <input
          type="text"
          className="todo-input"
          placeholder="What are you looking for?"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit" className="todo-btn">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ cursor: "pointer" }}
          />{" "}
          Search
        </button>
      </div>

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
          onClick={() => handleMode("add")}
        >
          <FontAwesomeIcon icon={faPlus} style={{ cursor: "pointer" }} /> Add
        </button>
      </div>
    </form>
  );
};
