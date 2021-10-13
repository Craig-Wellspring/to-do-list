import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';

const CategoryHeader = styled.div`
  color: white;
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div id="header">YOU-DO</div>
      <TodoForm obj={editItem} setTodos={setTodos} setEditItem={setEditItem} />

      <CategoryHeader>Cat 1</CategoryHeader>
      {todos.map((todo) => (todo.category === 'cat1' ? (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ) : null))}

      <CategoryHeader>Cat 2</CategoryHeader>
      {todos.map((todo) => (todo.category === 'cat2' ? (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ) : null))}

      <CategoryHeader>Cat 3</CategoryHeader>
      {todos.map((todo) => (todo.category === 'cat3' ? (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ) : null))}
    </>
  );
}

export default Initialize;
