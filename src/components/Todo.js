import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/todoData';

const TodoEntry = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;

  padding: 10px;
  border-radius: 4px;
  margin: 10px;
`;

const TodoLabel = styled.div`
  display: flex;
  padding: 0px 5px;
  width: 100%;
  text-align: left;
  align-items: center;
`;

const ButtonTray = styled.div`
  display: flex;
  column-gap: 5px;
`;

export default function Todo({ todo, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(todo.firebaseKey).then(setTodos);
    } else if (method === 'toggleComplete') {
      updateTodo(todo.firebaseKey, { complete: !todo.complete }).then(setTodos);
    }
  };

  return (
    <TodoEntry>
      <Button
        color={todo.complete ? 'secondary' : 'success'}
        onClick={() => handleClick('toggleComplete')}
      >
        {todo.complete ? 'DONE' : 'COMPLETE'}
      </Button>
      <TodoLabel>{todo.name}</TodoLabel>
      <ButtonTray>
        <Button color="primary" onClick={() => setEditItem(todo)}>
          EDIT
        </Button>
        <Button color="danger" onClick={() => handleClick('delete')}>
          DELETE
        </Button>
      </ButtonTray>
    </TodoEntry>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
