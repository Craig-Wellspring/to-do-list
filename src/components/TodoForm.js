import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTodo, updateTodo } from '../api/data/todoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
  firebaseKey: '',
};

export default function TodoForm({ obj, setTodos, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditItem({});
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTodo(formInput.firebaseKey, formInput).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <input
          name="name"
          id="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
        Name
      </label>
      <button type="submit">{obj.firebaseKey ? 'Update' : 'Submit'}</button>
    </form>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
