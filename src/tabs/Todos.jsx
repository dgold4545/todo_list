import { EditForm, Form, Text, TodoList } from "components";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const LS_TODOS_KEY = "todos_data";

export const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(window.localStorage.getItem(LS_TODOS_KEY)) ?? []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleAddTodo = (text) => {
    if (findTodo(text)) {
      alert("Todo already exists");
      return;
    }
    const newTodo = { id: nanoid(), text };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    window.localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const findTodo = (text, id = null) => {
    return todos.some((todo) => todo.text.toLowerCase() === text.toLowerCase());
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const handleEditTodo = (text) => {
    if (text === currentTodo.text) {
      alert("Todo with this text already exists!");
      return;
    }

    // if (findTodo(text)) {
    //   alert("Todo with this text already exists!");
    //   return;
    // }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentTodo.id ? { ...currentTodo, text } : todo
      )
    );

    cancelUpdate();
  };
  return (
    <>
      {isEditing ? (
        <EditForm
          defaultValue={currentTodo.text}
          onCancelUpdate={cancelUpdate}
          onHandleEditTodo={handleEditTodo}
        />
      ) : (
        <Form onSubmit={handleAddTodo} />
      )}

      {todos.length > 0 ? (
        <TodoList
          array={todos}
          onDeleteTodo={handleDeleteTodo}
          onUpdate={updateTodo}
        />
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};
