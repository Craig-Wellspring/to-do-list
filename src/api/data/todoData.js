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
  const todoList = await getTodos();

  return todoList;
};

const deleteTodo = async (firebaseKey) => {
  await axios.delete(`${baseURL}/${firebaseKey}.json`);
  const todoList = await getTodos();

  return todoList;
};

const updateTodo = async (firebaseKey, update) => {
  await axios.patch(`${baseURL}/${firebaseKey}.json`, update);
  const todoList = await getTodos();

  return todoList;
};

export {
  getTodos, createTodo, deleteTodo, updateTodo,
};
