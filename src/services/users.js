export const getUsers = async () => {
  const users = await fetch(`https://jsonplaceholder.typicode.com/users`);
  return await users.json();
};
