import type { errorResponse } from '../../types/requestResults';

const errorCodeMessages: Record<string, Record<string, string>> = {
  title: {
    NOT_UNIQUE: 'This title is already taken.',
  },
  year: {
    NOT_UNIQUE: 'This year is already taken.',
  },
  format: {
    NOT_UNIQUE: 'This format is already taken.',
  },
  email: {
    NOT_UNIQUE: 'This email is already registered.',
  },
  password: {
    NOT_UNIQUE: 'This password is already taken.',
  },
  'movies/size': {
    NOT_POSITIVE_INTEGER: 'Loaded file is empty. Please load another file.',
  },
  'data/email': {
    WRONG_EMAIL: 'Please enter a valid email address. example@example.com',
  },
};

export const getErrorMessage = (
  code: string,
  field?: string,
  fieldValue?: string
): string => {
  if (field && fieldValue && errorCodeMessages[field]?.[fieldValue]) {
    return errorCodeMessages[field][fieldValue || ''];
  }

  return field ? `${field}: ${fieldValue}` : `Unknown error: ${code}`;
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
      const errorMessages = Object.entries(apiError.error.fields).map(
        ([fieldName, fieldValue]) =>
          getErrorMessage(apiError.error.code, fieldName, fieldValue)
      );
      return errorMessages.join('\n');
    }

    if (apiError.error.code) {
      return getErrorMessage(apiError.error.code);
    }
  }

  return 'Something went wrong. Please try again.';
};
