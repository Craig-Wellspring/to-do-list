import React, { useEffect, useState } from 'react';
import { getTodos } from '../api/data/todoData';
import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';

function Initialize() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div id="header">YOU-DO</div>
      <TodoForm obj={{ ...todos }} setTodos={setTodos} />
      {todos.map((todo) => (
        <Todo key={todo.firebaseKey} todo={todo} setTodos={setTodos} />
      ))}
    </>
  );
}

export default Initialize;
