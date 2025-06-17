// pages/blogs/index.tsx
import { Blog } from "@/api/models/Blog";
import useFetch from "@/components/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
// import { div } from "framer-motion/client"; // This import is not used and can be removed
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Blogs() {
  const { data: session } = useSession(); // Get the session data

  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>();

  // --- ADDED FOR PAGINATION FUNCTIONALITY ---
  const postsPerPage = 6; // Number of JSONPlaceholder posts to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page for JSONPlaceholder posts
  // ------------------------------------------

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // --- ADDED FOR PAGINATION FUNCTIONALITY ---
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // ------------------------------------------

  //Blogs nga databaza jone
  const router = useRouter();
  const {data: blogsData, loading:blogsLoading, remove} = useFetch<Blog[]>("/api/blogs");

  const handleDeleteBlog = async(id: string) => {
    const confirmed = confirm(
      "A jeni i sigurt qe deshironi ta fshini kete blog?"
    )
    if(!confirmed) return;

    try{
      await remove(`/api/blogs/${id}`);
      alert("Blogu u fshi me sukses.");
      router.reload();
    }catch(error){
      alert("Gabim gjate fshirjes se blogut");
      console.error(error);
    }
  };

  // Helper function to render JSONPlaceholder posts
  const renderPosts = (type: "ssg" | "ssr" | "isr", title: string) => {
    // Calculate the posts to display based on current page and postsPerPage
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

    return (
      // Modern container for the JSONPlaceholder blog section
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 px-4 sm:px-6 lg:px-8 rounded-xl shadow-inner mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.length > 0 ? (
            currentPosts.map((post: Post) => (
              <motion.section
                key={post.id}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-700 line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-4 text-sm md:text-base">
                  {post.body}
                </p>
                <div className="flex justify-center items-center mt-auto pt-4 border-t border-gray-100 flex-wrap gap-2"> {/* Modified for button consistency */}
                  <Link href={`/blogs/${type}/${post.id}`}>
                    <button className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md text-sm text-center"> {/* Added flex-1 and min-w */}
                      Shiko Detajet
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out shadow-md text-sm text-center"> {/* Added flex-1 and min-w */}
                    Fshij Postin
                  </button>
                </div>
              </motion.section>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-600">
                <p className="text-xl">Nuk ka postime të disponueshme për këtë seksion.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Main Header for the Blogs Page */}
        <header className="py-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
            Blogjet Tona
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Zbuloni artikujt dhe lajmet më të fundit nga ekspertët tanë.
          </p>
        </header>

        {/* Blogs Section: From our database */}
        {blogsLoading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <CircularProgress />
          </div>
        ) : (
          <div className="bg-white py-12 px-6 rounded-xl shadow-lg mb-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Blogjet nga Databaza Jonë
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsData && blogsData.length > 0 ? (
                blogsData.map((post: Blog) => (
                  <motion.section
                    key={post._id}
                    className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-purple-700 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-4 text-sm md:text-base">
                      {post.body}
                    </p>
                    <div className="flex justify-center items-center mt-auto pt-4 border-t border-gray-100 flex-wrap gap-2"> {/* Modified for button consistency */}
                      <Link href={"/blogs/" + post._id}>
                        <button className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md text-sm text-center"> {/* Added flex-1 and min-w */}
                          Lexo me shume
                        </button>
                      </Link>

                      {/* CONDITIONAL RENDERING FOR ADMIN ACTIONS */}
                      {session?.user?.role === "admin" && (
                        <>
                          <Link href={"/update/blog/" + post._id}>
                            <button className="flex-1 min-w-[120px] px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200 ease-in-out shadow-md text-sm text-center"> {/* Added flex-1 and min-w */}
                              Perditeso
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(post._id!)}
                            className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out shadow-md text-sm text-center"> {/* Added flex-1 and min-w */}
                            Fshije postimin
                          </button>
                        </>
                      )}
                    </div>
                  </motion.section>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col justify-center items-center text-gray-600">
                  <p className="text-2xl font-semibold mb-4">Nuk ka blogs ne databazen</p>
                  {session?.user?.role === "admin" && (
                    <Link href={"/create/blog"}>
                      <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                        Krijo Blog
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
            {/* "Krijo Blog" button for admin, outside the loop */}
            {blogsData && blogsData.length > 0 && session?.user?.role === "admin" && (
              <div className="text-center pt-10 pb-4">
                <Link href={"/create/blog"}>
                  <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                    Krijo Blog
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* JSONPLACEHOLDER API Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <CircularProgress />
          </div>
        ) : (
          <>
            {renderPosts("ssg", "Blogjet e Kampionit (JSONPlaceholder)")}
            {renderPosts("ssr", "Blogjet me Renderim në Server")}
            {renderPosts("isr", "Blogjet me Rigjenerim Inkremental")}
          </>
        )}
        {/* Pagination Controls for JSONPlaceholder API Section */}
        {posts && posts.length > postsPerPage && (
          <div className="flex justify-center mt-10 mb-20">
            <nav className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-md">
              {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

Blogs.displayName = "Blogs | My Application";