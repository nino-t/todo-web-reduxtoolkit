import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodoById, fetchTodoList } from './api';

export const fetchTodoListAction = createAsyncThunk(
  'todos/fetchList',
  async () => {
    const response = await fetchTodoList();
    return response;
  }
);

export const fetchTodoByIdAction = createAsyncThunk(
  'todos/fetchById',
  async (id: number) => {
    const response = await fetchTodoById(id);
    return response;
  }
);