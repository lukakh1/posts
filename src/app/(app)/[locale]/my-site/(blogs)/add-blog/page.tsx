import { BlogForm } from "@/app/widgets";

export default function AddPost() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-700 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-slate-200 mb-6">
        Create New Blog
      </h2>
      <BlogForm />
    </div>
  );
}
