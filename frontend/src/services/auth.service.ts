import { parserErrors } from "@/helpers/parserErrors";
import { api } from "./axiosInstance";

interface IAuthData {
  fullName: string;
  email: string;
  _id: string;
  token: string;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await api.post<IAuthData>(`/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (err) {
    throw new Error(parserErrors(err));
  }
};

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await api.post<IAuthData>(`/auth/signup`, {
      fullName,
      email,
      password,
    });

    return data;
  } catch (err) {
    throw new Error(parserErrors(err));
  }
};