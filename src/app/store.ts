import { configureStore, ThunkAction, Action, Reducer } from '@reduxjs/toolkit';
import { createBrowserHistory, History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from './todos/slice';

export const history: History = createBrowserHistory();

export const store = configureStore({
  reducer: {
    router: connectRouter(history) as Reducer,
    counter: counterReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
