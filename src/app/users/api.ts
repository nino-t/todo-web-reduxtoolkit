export const fetchUserList = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users',
      {
        method: 'GET',
      }
    );
    return response.json();
  } catch (error) {
    throw(error);
  }
};
