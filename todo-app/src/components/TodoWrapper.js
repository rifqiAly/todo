import React, { useState, useEffect } from "react";
import axios from "axios";

import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { EditTodoForm } from "./EditTodoForm";
import { SearchForm } from "./SearchForm";

import { v4 as uuidv4 } from "uuid";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [suggested, setSuggested] = useState();
  const [mode, setMode] = useState("add");
  const [searchResult, setSearchResult] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    getSuggestions();
  };

  const handleMode = (mode) => {
    setMode(mode);
  };

  const searchTodo = (keyword) => {
    if (!keyword) {
      setSearchResult(todos);
    }
    setSearchResult(todos.filter((todo) => todo.task.includes(keyword)));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    handleMode('add')
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    handleMode('add')
  };

  const editTodo = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
    getSuggestions();
  };

  const getSuggestions = async () => {
    try {
      const result = await axios.get("https://www.boredapi.com/api/activity/");
      if (result.status === 200) {
        let suggestion = result.data.activity.toLowerCase();
        setSuggested(suggestion);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  useEffect(()=>{
    setSearchResult(todos)
    setMode('add')
  },[todos])

  return (
    <div className="TodoWrapper">
      <h1>Here are some things to do!</h1>
      {mode === "add" ? (
        <TodoForm addTodo={addTodo} handleMode={handleMode} />
      ) : (
        <SearchForm searchTodo={searchTodo} handleMode={handleMode} />
      )}
      <div className="Suggestion">
        {!suggested
          ? " "
          : `Got nothing to do? May I suggest you to ${suggested}?`}
      </div>
      {mode === "add"
        ? todos.map((todo, i) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTodo} task={todo} key={todo.id} />
            ) : (
              <TodoList
                task={todo}
                key={i}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )
          )
        : searchResult.map((todo, i) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTodo} task={todo} key={todo.id} />
            ) : (
              <TodoList
                task={todo}
                key={i}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )
          )}
    </div>
  );
};
