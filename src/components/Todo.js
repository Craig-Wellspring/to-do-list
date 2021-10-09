import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';

export default function Todo({ todo }) {
  return (
    <div>
      <Alert color="light">
        <Button color="success">COMPLETE</Button> {todo.name}{' '}
        <Button color="danger">DELETE</Button>
      </Alert>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
