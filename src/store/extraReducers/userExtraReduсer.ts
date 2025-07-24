import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseHandler } from '../../utils/responseHandler';
import * as UserAPI from '../APIs/userAPI';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }, thunkAPI) => {
    const response = await UserAPI.login(data);

    return responseHandler(response, thunkAPI);
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

    return responseHandler(response, thunkAPI);
  }
);
