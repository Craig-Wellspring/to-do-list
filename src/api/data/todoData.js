import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getTodos = async () => {
  const response = await axios.get(`${baseURL}/.json`);

  return response.data ? Object.values(response.data) : [];
};

const createTodo = async (obj) => {
  const newTodo = await axios.post(`${baseURL}/.json`, obj);
  const firebaseKey = newTodo.data.name;
  await axios.patch(`${baseURL}/${firebaseKey}.json`, { firebaseKey });

  return getTodos();
};

const deleteTodo = async (firebaseKey) => {
  await axios.delete(`${baseURL}/${firebaseKey}.json`);

  return getTodos();
};

const updateTodo = async (firebaseKey, updateObj) => {
  await axios.patch(`${baseURL}/${firebaseKey}.json`, updateObj);

  return getTodos();
};

export {
  getTodos, createTodo, deleteTodo, updateTodo,
};
