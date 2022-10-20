import axios from "axios";

export const getUsers = (start, end) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${end}`
  );
};
