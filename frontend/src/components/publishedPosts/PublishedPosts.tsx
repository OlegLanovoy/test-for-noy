import PostCard from "./postCard";
import { getAllPosts } from "@/services/posts.service";

export async function PublishedPosts() {
  const posts = await getAllPosts();
  return (
    <div className="grid gap-4">
      {posts.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No posts yet</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} {...post} />)
      )}
    </div>
  );
}
