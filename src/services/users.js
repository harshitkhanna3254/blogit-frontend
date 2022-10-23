import axios from "axios";

export const getUsers = () => {
  // console.log(`Start = ${start} and end = ${end}`);
  return axios.get(`https://jsonplaceholder.typicode.com/users`);
};

export const getAllUsers = () => {
  // console.log(`Start = ${start} and end = ${end}`);
  return axios.get(`https://jsonplaceholder.typicode.com/users`);
};
