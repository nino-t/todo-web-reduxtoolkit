export const fetchTodoList = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos',
      {
        method: 'GET',
      }
    );
    return response.json();
  } catch (error) {
    console.log('error', error);
  }
};
