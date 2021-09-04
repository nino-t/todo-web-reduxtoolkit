import { RootState } from '../store';
import { todosAdapter } from './slice';

export const {
  selectById: selectTodoById,
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos,
  selectTotal: selectTotalTodos,
} = todosAdapter.getSelectors((state: RootState) => state.todos);