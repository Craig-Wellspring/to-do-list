import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/todoData';

export default function Todo({ todo, setTodos }) {
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
        <Button color="success" onClick={() => handleClick('toggleComplete')}>
          COMPLETE
        </Button>{' '}
        {todo.name}{' '}
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
};
