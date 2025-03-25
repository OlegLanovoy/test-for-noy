import { AuthButtons } from "@/components/authButtons";
import { PublishedPosts, PostsSkeleton } from "@/components/publishedPosts";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <main className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to AI Blog Generator</h1>
          <p className="text-gray-600 mt-2">
            Explore public AI-generated blog posts or login to create your own.
          </p>
          <AuthButtons />
        </div>
        <Suspense fallback={<PostsSkeleton />}>
          <PublishedPosts />
        </Suspense>
      </div>
    </main>
  );
}
