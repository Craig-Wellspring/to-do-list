import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/todoData';

export default function Todo({ todo, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(todo.firebaseKey).then(setTodos);
    } else if (method === 'toggleComplete') {
      updateTodo(todo.firebaseKey, { complete: !todo.complete }).then(setTodos);
    }
  };

  return (
    <div>
      <Alert color="light">
        <Button
          color={todo.complete ? 'secondary' : 'success'}
          onClick={() => handleClick('toggleComplete')}
        >
          {todo.complete ? 'DONE' : 'COMPLETE'}
        </Button>{' '}
        {todo.name}{' '}
        <Button color="warning" onClick={() => setEditItem(todo)}>
          EDIT
        </Button>{' '}
        <Button color="danger" onClick={() => handleClick('delete')}>
          DELETE
        </Button>
      </Alert>
    </div>
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
