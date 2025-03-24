// components/PostCard.tsx
import Link from "next/link";

interface PostCardProps {
  _id: string;
  title: string;
  createdAt: string;
  user: {
    fullName: string;
  };
}

export default function PostCard({
  _id,
  title,
  createdAt,
  user,
}: PostCardProps) {
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
