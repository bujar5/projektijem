// pages/blogs/index.tsx
import { Blog } from "@/api/models/Blog";
import useFetch from "@/components/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Blogs() {
  const { data: session } = useSession();

  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>();

  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const router = useRouter();
  const { data: blogsData, loading: blogsLoading, remove } = useFetch<Blog[]>("/api/blogs");

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm(
      "A jeni i sigurt qe deshironi ta fshini kete blog?"
    );
    if (!confirmed) return;

    try {
      await remove(`/api/blogs/${id}`);
      alert("Blogu u fshi me sukses.");
      router.reload();
    } catch (error: unknown) {
      let errorMessage = "Gabim gjate fshirjes se blogut";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      alert(errorMessage);
      console.error(error);
    }
  };

  const renderPosts = (type: "ssg" | "ssr" | "isr", title: string) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

    return (
      <div className="bg-[#1f1f1f] py-16 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg mb-12 border border-[#FFD700]/20">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#FFD700] mb-10 text-center tracking-tight uppercase">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.length > 0 ? (
            currentPosts.map((post: Post) => (
              <motion.section
                key={post.id}
                className="bg-[#2c2c2c] p-6 rounded-xl shadow-lg flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border border-transparent hover:border-[#FFD700]/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-white line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-6 flex-grow line-clamp-4 text-sm md:text-base leading-relaxed">
                  {post.body}
                </p>
                <div className="flex justify-center items-center mt-auto pt-4 border-t border-gray-700 flex-wrap gap-2">
                  <Link href={`/blogs/${type}/${post.id}`} passHref legacyBehavior>
                    <button className="flex-1 min-w-[120px] px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-200 ease-in-out shadow-md text-sm text-center">
                      Shiko Detajet
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out shadow-md text-sm text-center">
                    Fshij Postin
                  </button>
                </div>
              </motion.section>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-400">
                <p className="text-xl">Nuk ka postime të disponueshme për këtë seksion.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-[#121212] flex flex-col items-center text-white"> {/* Corrected main container div start */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <header className="py-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#FFD700] leading-tight mb-4 tracking-tight uppercase">
            Blogjet Tona
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Zbuloni artikujt dhe lajmet më të fundit nga ekspertët tanë.
            Një pasqyrë e thellë në botën e politikës.
          </p>
        </header>

        {blogsLoading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <CircularProgress color="inherit" sx={{ color: '#FFD700' }} />
          </div>
        ) : (
          <div className="bg-[#1f1f1f] py-12 px-6 rounded-xl shadow-lg mb-12 border border-[#FFD700]/20">
            <h2 className="text-3xl font-bold text-[#FFD700] mb-8 text-center uppercase">
              Blogjet nga Databaza Jonë
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsData && blogsData.length > 0 ? (
                blogsData.map((post: Blog) => (
                  <motion.section
                    key={post._id}
                    className="bg-[#2c2c2c] p-6 rounded-xl shadow-md flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-[#FFD700]/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6 flex-grow line-clamp-4 text-sm md:text-base leading-relaxed">
                      {post.body}
                    </p>
                    <div className="flex justify-center items-center mt-auto pt-4 border-t border-gray-700 flex-wrap gap-2">
                      <Link href={"/blogs/" + post._id} passHref legacyBehavior>
                        <button className="flex-1 min-w-[120px] px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-200 ease-in-out shadow-md text-sm text-center">
                          Lexo me shume
                        </button>
                      </Link>

                      {session?.user?.role === "admin" && (
                        <>
                          <Link href={"/update/blog/" + post._id} passHref legacyBehavior>
                            <button className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md text-sm text-center">
                              Perditeso
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(post._id!)}
                            className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out shadow-md text-sm text-center">
                            Fshije postimin
                          </button>
                        </>
                      )}
                    </div>
                  </motion.section>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col justify-center items-center text-gray-400">
                    <p className="text-2xl font-semibold mb-4">Nuk ka blogs ne databazen</p>
                    {session?.user?.role === "admin" && (
                      <Link href={"/create/blog"} passHref legacyBehavior>
                        <button className="px-8 py-3 bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                          Krijo Blog
                        </button>
                      </Link>
                    )}
                </div>
              )}
            </div>
            {blogsData && blogsData.length > 0 && session?.user?.role === "admin" && (
              <div className="text-center pt-10 pb-4">
                <Link href={"/create/blog"} passHref legacyBehavior>
                  <button className="px-8 py-3 bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                    Krijo Blog
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* JSONPlaceholder Posts - Keeping the same dark theme */}
        {loading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <CircularProgress color="inherit" sx={{ color: '#FFD700' }} />
          </div>
        ) : (
          <>
            {renderPosts("ssg", "Blogjet e Kampionit (JSONPlaceholder)")}
            {renderPosts("ssr", "Blogjet me Renderim në Server")}
            {renderPosts("isr", "Blogjet me Rigjenerim Inkremental")}
          </>
        )}
        {posts && posts.length > postsPerPage && (
          <div className="flex justify-center mt-10 mb-20">
            <nav className="flex items-center gap-2 bg-[#1f1f1f] p-2 rounded-xl shadow-md border border-[#FFD700]/20">
              {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${currentPage === index + 1
                    ? 'bg-[#FFD700] text-black shadow-md'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div> // Corrected main container div end
  );
}

Blogs.displayName = "Blogs | My Application";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}