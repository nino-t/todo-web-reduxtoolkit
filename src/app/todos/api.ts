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
    throw(error);
  }
};

export const fetchTodoById = async (id: number) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'GET',
      }
    );
    return response.json();
  } catch (error) {
    throw(error);
  }
};
