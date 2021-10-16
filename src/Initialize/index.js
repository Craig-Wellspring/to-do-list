import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getTodos } from '../api/data/todoData';
import Navigation from '../components/Navigation';
import Routes from '../routes';
import TodoForm from '../components/TodoForm';
import SignIn from '../views/SignIn';

const categories = ['Cat 1', 'Cat 2', 'Cat 3'];
const populatedCats = [];

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);
  const [catState, setCatState] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authedUser) => {
      if (authedUser) {
        const userInfoObj = {
          fullName: authedUser.displayName,
          profileImage: authedUser.photoURL,
          uid: authedUser.uid,
          user: authedUser.email.split('@')[0],
        };
        setUser(userInfoObj);
        getTodos(false).then(setTodos);
        setCatState(categories);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <div id="header">YOU-DO</div>
          <TodoForm
            obj={editItem}
            setTodos={setTodos}
            setEditItem={setEditItem}
            catState={catState}
          />
          {catState.forEach((cat) => {
            todos.forEach((todo) => {
              if (todo.category === cat) {
                if (!populatedCats.includes(cat)) {
                  populatedCats.push(cat);
                }
              }
            });
          })}
          <Navigation />
          <br />
          <Routes
            todos={todos}
            setTodos={setTodos}
            setEditItem={setEditItem}
            catState={catState}
          />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </>
  );
}

export default Initialize;
