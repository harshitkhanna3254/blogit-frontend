export const getPosts = async (userId) => {
  const posts = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=10`
  );

  return await posts.json();
};
