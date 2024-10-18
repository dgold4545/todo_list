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
    // if (text === currentTodo.text) {
    //   alert("Todo with this text already exists!");
    //   return;
    // }
    // const originalText = currentTodo.text;
    // if (originalText.toLowerCase() === text.toLowerCase()) {
    //   setTodos((prevTodos) =>
    //     prevTodos.map((todo) =>
    //       todo.id === currentTodo.id ? { ...currentTodo, text } : todo
    //     )
    //   );
    // }
    // if (findTodo(text)) {
    //   const answer = confirm(
    //     "Todo with this text already exists!!!Are you realy want to change this todo"
    //   );
    //   if (answer) {
    //     setTodos((prevTodos) =>
    //       prevTodos.map((todo) =>
    //         todo.id === currentTodo.id ? { ...currentTodo, text } : todo
    //       )
    //     );
    //   }
    // }
    // setTodos((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo.id === currentTodo.id ? { ...currentTodo, text } : todo
    //   )
    // );
    // cancelUpdate();

    const originalText = currentTodo.text;

    // Якщо текст не змінився
    if (text === originalText) {
      alert("Todo with this text already exists!");
      return;
    }

    // Якщо змінився лише регістр
    if (originalText.toLowerCase() === text.toLowerCase()) {
      updateTodoList(text);
      cancelUpdate();

      return;
    }

    // Якщо знайдено іншу тудушку з таким самим текстом
    if (findTodo(text)) {
      const answer = confirm(
        "Todo with this text already exists!!! Are you sure you want to change this todo?"
      );

      if (!answer) {
        return;
      }
    }

    // Оновлюємо тудушку, якщо перевірки пройдені
    updateTodoList(text);
    cancelUpdate();
  };

  const updateTodoList = (text) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentTodo.id ? { ...currentTodo, text } : todo
      )
    );
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
