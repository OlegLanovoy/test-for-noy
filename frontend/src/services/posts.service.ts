import { parserErrors } from "@/helpers/parserErrors";
import { api } from "./axiosInstance";

export interface IPost {
  _id: string;
  title: string;
  text: string;
  isPublished: boolean;
  createdAt: Date;
  user: {
    fullName: string;
  };
}

export type PostWithoutUser = Omit<IPost, "user">

export const getPostById = async (id: string) => {
  try {
    const { data } = await api.get<IPost>(`/posts/${id}`);
    return data;
  } catch (err) {
    throw new Error(parserErrors(err));
  }
};

export const publishPost = async (id: string) => {
  try {
    const response = await api.put(`/posts/${id}`, null, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error(parserErrors(err));
  }
};

export const getUserPosts = async () => {
  try {
    const { data } = await api.get<PostWithoutUser[]>(`/posts/user`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (err) {
    throw new Error(parserErrors(err));

  }
};

export const savePost = async (title: string, text: string) => {
  try {
    const { data } = await api.post<PostWithoutUser>("/posts/save",
      {
        title,
        text
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (err) {
    throw new Error(parserErrors(err));

  }
};


export const generatePost = async (topic: string, style: string) => {
  const prompt = `${topic} ${style}`;
  try {
    const { data } = await api.post<{ generatedPost: string }>(`/generate`, {
      prompt,
    },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
    return data;
  } catch (err) {
    throw new Error(parserErrors(err));
  }
};

export const getAllPosts = async () => {
  try {
    const { data } = await api.get<IPost[]>(`/posts`);
    return data;
  } catch (err) {
    throw new Error(parserErrors(err));
  }
};