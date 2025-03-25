// components/PostCard.tsx
import { IPost } from "@/services/posts.service";
import Link from "next/link";

export default function PostCard({ _id, title, createdAt, user }: IPost) {
  return (
    <Link href={`/posts/${_id}`}>
      <div className="border rounded-xl p-4 hover:shadow-md transition bg-white">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p>Posted by {user.fullName}</p>
      </div>
    </Link>
  );
}
