import { Blog } from "@/api/models/Blog";
import useFetch from "@/components/hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateBlog() {
  const router = useRouter();
  const [newBlog, setNewBlog] = useState({ title: "", body: "" });
  const { post, error, loading } = useFetch<Blog[]>("/api/blogs");

  const handleCreate = async () => {
    if (!newBlog.title || !newBlog.body) {
      alert("Ju lutem plotësoni të gjitha fushat");
      return;
    }

    console.log("Creating blog with:", newBlog); // Debug log

    try {
      await post(newBlog);
      alert("Blogu u krijua me sukses!");
      setNewBlog({ title: "", body: "" });
      router.push("/blogs");
    } catch (err) {
      console.error("Gabim gjatë krijimit:", err);
      alert("Gabim gjatë krijimit të blogut");
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Shto një blog të ri
          </h2>

          <input
            type="text"
            placeholder="Titulli"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <textarea
            placeholder="Përmbajtja"
            value={newBlog.body}
            onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Duke shtuar..." : "Shto Blog"}
          </button>

          {error && <p className="text-red-500 mt-4">Gabim: {error}</p>}
        </div>
      </div>
    </div>
  );
}

CreateBlog.displayName = "Create Blog | My Application";
