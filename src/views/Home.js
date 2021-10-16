import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Todo from '../components/Todo';

const CategoryHeader = styled.div`
  color: white;
  margin: 0px 10px;
`;

export default function Home({
  todos, setTodos, setEditItem, catState,
}) {
  return (
    <>
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

Home.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  catState: PropTypes.arrayOf(PropTypes.string).isRequired,
};
