import { createAsyncThunk } from '@reduxjs/toolkit';
import * as UserAPI from '../APIs/userAPI';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }, thunkAPI) => {
    const response = await UserAPI.login(data);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.token;
  }
);

export const createUser = createAsyncThunk(
  'user/create',
  async (
    data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    thunkAPI
  ) => {
    const response = await UserAPI.createUser(data);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.token;
  }
);
