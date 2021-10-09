import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getTodos = async () => {
  const response = await axios.get(`${baseURL}/.json`);

  return Object.values(response.data);
};

const createTodo = async (obj) => {
  const newTodo = await axios.post(`${baseURL}/.json`, obj);
  const firebaseKey = newTodo.data.name;
  await axios.patch(`${baseURL}/${firebaseKey}.json`, { firebaseKey });
  const todoList = await getTodos();

  return todoList;
};

export { getTodos, createTodo };
