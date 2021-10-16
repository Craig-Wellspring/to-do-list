import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Todo from '../components/Todo';
import { deleteCompletedTodo, getCompletedTodos } from '../api/data/todoData';

const CategoryHeader = styled.div`
  color: white;
  margin: 0px 10px;
`;

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

export default function ViewAll({
  todos, setTodos, setEditItem, catState,
}) {
  const [completedTodos, setCompletedTodos] = useState([]);
  useEffect(() => {
    getCompletedTodos().then(setCompletedTodos);
  }, []);

  const handleClick = (key) => {
    deleteCompletedTodo(key).then(setCompletedTodos);
  };

  return (
    <>
      Incomplete
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
      <br />
      Completed
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

ViewAll.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  catState: PropTypes.arrayOf(PropTypes.string).isRequired,
};
