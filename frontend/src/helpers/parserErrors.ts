import { AxiosError } from "axios";

export const parserErrors = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const errorData = err.response?.data?.error;

    if (Array.isArray(errorData)) {
      const messages = errorData.map((err) => err.message).join('; ');
      return messages;
    }

    return errorData.message || err.message;
  }
  return "Unknown Error";
}