import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { User, UserAppendState } from '../../interfaces/users';
import { fetchUserListAction } from './action';

export const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState<UserAppendState>({ status: 'idle', error: null });

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserListAction.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserListAction.fulfilled, (state, action) => {
        state.status = 'idle'
        usersAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchUserListAction.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.stack as string
      });
  },
})

const reducer = slice.reducer
export default reducer