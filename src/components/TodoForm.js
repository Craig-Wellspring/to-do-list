import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTodo } from '../api/data/todoData';

export default function TodoForm({ obj = {} }) {
  const [formInput, setFormInput] = useState({
    name: obj?.name || '',
    id: obj?.id || '',
  });

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTodo(formInput);
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
      <button type="submit">Submit</button>
    </form>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
