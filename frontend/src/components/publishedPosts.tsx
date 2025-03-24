import React from "react";
import PostCard from "./postCard";
import { PostProps } from "@/app/page";

interface PublishedPostsProps {
  posts: PostProps[];
}

export const PublishedPosts = ({ posts }: PublishedPostsProps) => {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
