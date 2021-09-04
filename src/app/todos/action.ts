import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodoList } from './api';

export const fetchTodoListAction = createAsyncThunk(
  'todos/fetchList',
  async () => {
    const response = await fetchTodoList();
    return response;
  }
);