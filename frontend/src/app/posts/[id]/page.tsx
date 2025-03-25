"use client";
import { getPostById, IPost } from "@/services/posts.service";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostById(id as string);
        setPost(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(err.message);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
      </p>
      <div className="prose prose-neutral whitespace-pre-wrap">
        {post?.text}
      </div>
    </div>
  );
}
