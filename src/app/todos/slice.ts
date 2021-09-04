import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { Todo } from '../../interfaces/todos';
import { fetchTodoListAction } from './action';

export const todosAdapter = createEntityAdapter<Todo>();
const initialState = todosAdapter.getInitialState({ loading: false, activeRequestId: null });

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodoListAction.fulfilled, todosAdapter.upsertMany)
  },
})

const reducer = slice.reducer
export default reducer