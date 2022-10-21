import axios from "axios";

export const getPosts = (start, end) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${end}`
  );
};
