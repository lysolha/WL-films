import type { errorResponse } from '../../types/requestResults';

const errorCodeMessages: Record<string, string> = {
  AUTHENTICATION_FAILED: 'Invalid email address or password.',
  EMAIL_ALREADY_EXISTS: 'This email is already registered.',
  NOT_UNIQUE: 'This email is already registered.',
  REQUIRED: 'This field is required. Please fill in all fields.',
};

export const getErrorMessage = (code: string, field?: string): string => {
  const message = errorCodeMessages[code];

  if (message) return message;

  return field ? `${field}: ${code}` : `Unknown error: ${code}`;
};

export const handleApiError = (error: unknown): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as errorResponse).status === 0
  ) {
    const apiError = error as errorResponse;

    if (apiError.error.fields) {
      const firstField = Object.keys(apiError.error.fields)[0];
      const messageCode =
        apiError.error.fields[firstField as keyof typeof apiError.error.fields];
      return getErrorMessage(messageCode, firstField);
    }

    if (apiError.error.code) {
      return getErrorMessage(apiError.error.code);
    }
  }

  return 'Something went wrong. Please try again.';
};
