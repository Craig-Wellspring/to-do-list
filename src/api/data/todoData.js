import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getTodos = async (value) => {
  const response = await axios.get(
    `${baseURL}/.json?orderBy="complete"&equalTo=${value}`,
  );

  return response.data ? Object.values(response.data) : [];
};

const getCompletedTodos = async () => {
  const response = await getTodos(true);

  return response;
};

const getAllTodos = async () => {
  const response = await axios.get(`${baseURL}/.json`);

  return response.data ? Object.values(response.data) : [];
};

const createTodo = async (obj) => {
  const newTodo = await axios.post(`${baseURL}/.json`, obj);
  const firebaseKey = newTodo.data.name;
  await axios.patch(`${baseURL}/${firebaseKey}.json`, { firebaseKey });

  return getTodos(false);
};

const deleteTodo = async (firebaseKey) => {
  await axios.delete(`${baseURL}/${firebaseKey}.json`);

  return getTodos(false);
};

const deleteCompletedTodo = async (firebaseKey) => {
  await axios.delete(`${baseURL}/${firebaseKey}.json`);

  return getCompletedTodos();
};

const updateTodo = async (firebaseKey, updateObj) => {
  await axios.patch(`${baseURL}/${firebaseKey}.json`, updateObj);

  return getTodos(false);
};

export {
  getTodos,
  getCompletedTodos,
  getAllTodos,
  createTodo,
  deleteTodo,
  deleteCompletedTodo,
  updateTodo,
};
