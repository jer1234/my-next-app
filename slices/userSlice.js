import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

//Load user
export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await fetch('/api/getUsers',);
  return await response.json();
});

//retrieve user email
export const unmaskEmail = createAsyncThunk('users/unmaskEmail', async (userId) => {
  const response = await fetch(`/api/getEmailbyId?id=${userId}`);
  const email = await response.json();
  return { userId, email };
});


//initiate all
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers:{
    maskEmail: (state, action) => {
      const userId = action.payload;
      state.users = state.users.map(user =>
        user.id === userId ? { ...user, email: '**********' } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(unmaskEmail.fulfilled, (state, action) => {
        const { userId, email } = action.payload;
        state.users = state.users.map(user =>
          user.id === userId ? { ...user, email } : user
        );
      });
  },
});

export const {maskEmail} = userSlice.actions;

export default userSlice.reducer;
