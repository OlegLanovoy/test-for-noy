"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { generatePost, getUserPosts, publishPost } from "@/request/requests";
import { api } from "@/request/requests";
import { AxiosError } from "axios";

import { PostProps } from "../page";

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("");

  const [generatedContent, setGeneratedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [userPosts, setUserPosts] = useState<PostProps[]>();

  const handleGenerate = async () => {
    const { generatedPost } = await generatePost(topic, style);
    setGeneratedContent(generatedPost);
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts();
        setUserPosts(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message);
        }
      }
    };
    fetchData();
  }, []);

  const publishUserPost = async (id: string) => {
    const isPublished = await publishPost(id);
    if (isPublished) {
      setUserPosts((prevPosts) =>
        prevPosts?.map((post) =>
          post._id === id ? { ...post, published: true } : post
        )
      );
    }
  };

  const handleSave = async () => {
    try {
      const response = await api.post("/posts/save", {
        title: topic,
        text: generatedContent,
      });

      setUserPosts((prev) => [...(prev || []), response.data as PostProps]);

      setIsEditing(false);
      setTopic("");
      setStyle("");
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-2xl font-bold">Your Dashboard</h1>

      {/* Генератор */}
      <div className="space-y-4 border p-4 rounded-xl bg-white shadow-sm">
        <div>
          <Label>Topic</Label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. AI in Healthcare"
          />
        </div>
        <div>
          <Label>Style</Label>
          <Input
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="e.g. Professional"
          />
        </div>
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
      {isEditing && (
        <div className="space-y-4 border p-4 rounded-xl bg-white shadow-sm">
          <Label>Edit Post</Label>
          <textarea
            className="w-full border rounded-md p-2 min-h-[150px]"
            value={generatedContent}
            onChange={(e) => setGeneratedContent(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Discard
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Posts</h2>
        {userPosts?.map((post) => (
          <div
            key={post._id}
            className="flex items-center justify-between border p-3 rounded-lg bg-white shadow-sm"
          >
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()} •{" "}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/posts/${post._id}`}>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </Link>

              {post.isPublished ? (
                <span>Published</span>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => publishUserPost(post._id)}
                >
                  Make Public
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
