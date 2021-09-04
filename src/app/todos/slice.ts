import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { Todo, TodoAppendState } from '../../interfaces/todos';
import { fetchTodoListAction } from './action';

export const todosAdapter = createEntityAdapter<Todo>();
const initialState = todosAdapter.getInitialState<TodoAppendState>({ status: 'idle', errorMessage: null });

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoListAction.pending, (state, action) => {
        state.status = 'loading'
        state.errorMessage = null
      })
      .addCase(fetchTodoListAction.fulfilled, (state, action) => {
        state.status = 'idle'
        todosAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchTodoListAction.rejected, (state, action) => {
        state.status = 'failed'
        state.errorMessage = action.error.stack as string
      });
  },
})

const reducer = slice.reducer
export default reducer