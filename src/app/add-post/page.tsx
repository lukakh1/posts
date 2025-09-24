import { PostForm } from "@/features/post-form/ui";

export default function AddPost() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>
      <PostForm />;
    </div>
  );
}
