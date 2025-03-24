// lib/api.ts
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export const getPostById = async (id: string) => {
  try {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Getting data failed`);
    }
    throw new Error(`Unknown Error`);
  }
};

export const publishPost = async (id: string) => {
  try {
    const response = await api.put(`/posts/${id}`);
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Getting data failed`);
    }
    throw new Error(`Unknown Error`);
  }
};

export const getUserPosts = async () => {
  try {
    const { data } = await api.get(`/posts/user`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Getting data failed`);
    }
    throw new Error(`Unknown Error`);
  }
};

export const savePost = async (id: number) => {
  try {
    const { data } = await api.post(`/posts/${id}`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Saving post failed`);
    }
    throw new Error(`Unknown Error`);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await api.post(`/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error(`Unknown Error`);
  }
};

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await api.post(`/auth/signup`, {
      fullName,
      email,
      password,
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Register failed`);
    }
    throw new Error(`Unknown Error`);
  }
};

export const generatePost = async (topic: string, style: string) => {
  const prompt = `${topic} ${style}`;

  try {
    const { data } = await api.post(`/generate`, {
      prompt,
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Generate Failed`);
    }
    throw new Error(`Unknown Error`);
  }
};

export const getAllPosts = async () => {
  try {
    const { data } = await api.get(`/posts`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || `Getting data failed`);
    }
    throw new Error(`Unknown Error`);
  }
};
