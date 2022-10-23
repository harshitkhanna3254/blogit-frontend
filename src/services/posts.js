import axios from "axios";

export const getPosts = (userId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId${userId}&_limit=10`
  );
};
