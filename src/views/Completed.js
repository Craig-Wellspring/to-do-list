import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { deleteCompletedTodo, getCompletedTodos } from '../api/data/todoData';

const TodoEntry = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;

  padding: 10px;
  border-radius: 4px;
  margin: 10px 0px;
`;

const TodoLabel = styled.div`
  display: flex;
  padding: 0px 5px;
  width: 100%;
  text-align: left;
  align-items: center;

  color: black;
`;

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);
  useEffect(() => {
    getCompletedTodos().then(setCompletedTodos);
  }, []);

  const handleClick = (key) => {
    deleteCompletedTodo(key).then(setCompletedTodos);
  };

  return (
    <>
      {completedTodos.map((todo) => (
        <TodoEntry key={todo.firebaseKey}>
          <TodoLabel>{todo.name}</TodoLabel>
          <Button color="danger" onClick={() => handleClick(todo.firebaseKey)}>
            DELETE
          </Button>
        </TodoEntry>
      ))}
    </>
  );
}
