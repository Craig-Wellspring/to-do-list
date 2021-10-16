import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Completed from '../views/Completed';
import Home from '../views/Home';
import ViewAll from '../views/ViewAll';

export default function Routes({
  todos, setTodos, setEditItem, catState,
}) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Home
              todos={todos}
              setTodos={setTodos}
              setEditItem={setEditItem}
              catState={catState}
            />
          )}
        />
        <Route exact path="/completed" component={Completed} />
        <Route
          exact
          path="/all"
          component={() => (
            <ViewAll
              todos={todos}
              setTodos={setTodos}
              setEditItem={setEditItem}
              catState={catState}
            />
          )}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  catState: PropTypes.arrayOf(PropTypes.string).isRequired,
};
