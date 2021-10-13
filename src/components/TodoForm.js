import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createTodo, updateTodo } from '../api/data/todoData';

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  #inputText {
    display: flex;
    width: 100%;
  }

  #submitButton {
    margin: 10px;
  }
`;

const TextInput = styled.input`
  width: 100%;

  padding: 6px 10px;
  border-radius: 4px 0px 0px 4px;
`;

const CategoryDropdown = styled.select`
  padding: 6px;
  border-radius: 0px 4px 4px 0px;
`;

const initialState = {
  name: '',
  complete: false,
  category: 'cat1',
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
        category: obj.category,
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
    <>
      <FormStyle onSubmit={handleSubmit}>
        <div id="inputText">
          <TextInput
            name="name"
            id="name"
            placeholder="Add a YOU-Do"
            value={formInput.name}
            onChange={handleChange}
            required
          />
          <CategoryDropdown
            name="category"
            onChange={handleChange}
            value={formInput.category}
          >
            <option value="cat1">Category 1</option>
            <option value="cat2">Category 2</option>
            <option value="cat3">Category 3</option>
          </CategoryDropdown>
        </div>
        <button
          type="submit"
          id="submitButton"
          className={obj.firebaseKey ? 'btn btn-primary' : 'btn btn-success'}
        >
          {obj.firebaseKey ? 'Update' : 'Submit'}
        </button>
      </FormStyle>
      <br />
    </>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    category: PropTypes.string,
    date: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
