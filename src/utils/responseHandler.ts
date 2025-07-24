import type { errorResponse, successResponse } from '../types/requestResults';

const isErrorResponse = (
  response: successResponse | errorResponse
): response is errorResponse => {
  return response.status === 0;
};

interface ThunkAPI {
  rejectWithValue: (value: unknown) => unknown;
}

export const responseHandler = (
  response: successResponse | errorResponse,
  thunkAPI: ThunkAPI
) => {
  if (isErrorResponse(response)) {
    return thunkAPI.rejectWithValue(response);
  }

  return response.token || response.data;
};
