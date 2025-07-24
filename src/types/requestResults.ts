export type successResponse = {
  status: number;
  message: string;
  data?: object;
  token?: string;
};

export type errorResponse = {
  status: number;
  error: {
    fields?: object;
    code: string;
  };
};
