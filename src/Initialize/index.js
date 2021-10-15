import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';

const CategoryHeader = styled.div`
  color: white;
  margin: 0px 10px;
`;

const categories = ['Cat 1', 'Cat 2', 'Cat 3'];
const populatedCats = [];

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [catState, setCatState] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
    setCatState(categories);
  }, []);

  return (
    <>
      <div id="header">YOU-DO</div>
      <TodoForm
        obj={editItem}
        setTodos={setTodos}
        setEditItem={setEditItem}
        catState={catState}
      />
      {catState.forEach((cat) => {
        todos.forEach((todo) => {
          if (todo.category === cat) {
            if (!populatedCats.includes(cat)) {
              populatedCats.push(cat);
            }
          }
        });
      })}
      {catState.map((category) => (
        <CategoryHeader key={category}>
          {category}
          {todos.map((todo) => (todo.category === category ? (
            <Todo
              key={todo.firebaseKey}
              todo={todo}
              setTodos={setTodos}
              setEditItem={setEditItem}
            />
          ) : null))}
        </CategoryHeader>
      ))}
    </>
  );
}

export default Initialize;
