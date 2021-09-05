import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { Todo, TodoAppendState } from '../../interfaces/todos';
import { fetchTodoByIdAction, fetchTodoListAction } from './action';

export const todosAdapter = createEntityAdapter<Todo>();
const initialState = todosAdapter.getInitialState<TodoAppendState>({ status: 'idle', error: null });

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoListAction.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodoListAction.fulfilled, (state, action) => {
        state.status = 'idle';
        todosAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchTodoListAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.stack as string;
      })
      .addCase(fetchTodoByIdAction.fulfilled, todosAdapter.addOne);
  },
})

const reducer = slice.reducer;
export default reducer;