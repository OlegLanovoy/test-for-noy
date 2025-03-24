// app/page.tsx
import { PublishedPosts } from "@/components/publishedPosts";
import { getAllPosts } from "@/request/requests";
import { AuthButtons } from "@/components/authButtons";

export interface PostProps {
  _id: string;
  title: string;
  createdAt: string;
  isPublished: boolean;
  user: {
    fullName: string;
  };
}

export default async function HomePage() {
  let posts: PostProps[] = [];
  try {
    posts = await getAllPosts();
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to AI Blog Generator</h1>
          <p className="text-gray-600 mt-2">
            Explore public AI-generated blog posts or login to create your own.
          </p>

          <div className="mt-4 flex justify-center gap-4">
            <AuthButtons />
          </div>
        </div>

        <PublishedPosts posts={posts} />
      </div>
    </main>
  );
}
