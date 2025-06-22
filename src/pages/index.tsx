
import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.jpg";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export interface Post {
  id: string;
  title: string;
  body: string;
}

// Mock implementation of useFetch (replace with your actual hook)
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default function Home() {
  const { data: initialPosts, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="pt-14 bg-[#121212] text-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="w-full py-24 flex flex-col items-center justify-center bg-[#1f1f1f] text-center shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-wider uppercase text-[#FFD700]">
          War Spirit
        </h1>
        <p className="text-lg max-w-2xl mb-6 text-gray-300 font-light">
          Unfiltered Political Commentary. Truth in Every Word.
        </p>
        <Button
          text="Our Mission"
          onClick={() => alert("Redirecting")}
          className="bg-[#FFD700] text-black font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
        />
      </motion.section>

      {/* Who We Are Section */}
      <motion.section
        className="w-full py-20 bg-white text-black"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 text-[#FFD700] uppercase text-center md:text-left">
              Who We Are
            </h2>
            <p className="text-lg leading-relaxed">
              War Spirit is a political blog dedicated to exposing corruption,
              investigating political truths, and bringing clarity to the chaos.
              We operate independently and speak fearlessly in the interest of the people.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={CustomImage}
              alt="Political Insight"
              width={500}
              height={300}
              className="rounded-2xl shadow-xl border border-[#FFD700] object-cover"
              style={{ maxWidth: "100%", height: "auto" }} // Ensure image is responsive
            />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full py-20 text-center bg-[#1f1f1f]"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-[#FFD700] uppercase">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-6xl mx-auto">
            <Card
              title="Courageous Reporting"
              description="Fearless journalism that digs deeper into state affairs."
              icon={Rocket}
              className="bg-[#2c2c2c] text-white"
            />
            <Card
              title="Data-Backed Opinions"
              description="Every opinion supported by analysis, not emotion."
              icon={BarChart}
              className="bg-[#2c2c2c] text-white"
            />
            <Card
              title="Accountability"
              description="Holding power to account through facts and transparency."
              icon={ShieldCheck}
              className="bg-[#2c2c2c] text-white"
            />
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="w-full py-20 px-4 text-center bg-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[#FFD700] uppercase">
          Our Mission
        </h2>
        <p className="text-black mb-8 max-w-3xl mx-auto">
          We aim to expose injustice, promote transparency, and contribute to political awareness across the Balkans and beyond.
        </p>
        <Button
          text="Join the Movement"
          onClick={() => alert("Redirecting...")}
          className="bg-[#FFD700] text-black font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
        />
      </motion.section>

      {/* Blog Section */}
      <div className="w-full py-20 bg-[#1f1f1f]">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#FFD700] uppercase">
          Latest Articles
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {currentPosts?.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-[#2c2c2c] p-6 rounded-lg shadow-md"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-[#FFD700] line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-200 mb-6">{post.body}</p>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                  >
                    Delete Article
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {posts && posts.length > postsPerPage && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center gap-2">
                  {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-[#FFD700] text-black"
                          : "bg-[#2c2c2c] text-white hover:bg-[#3a3a3a]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Contact Section */}
      <motion.section
        className="w-full py-20 bg-[#1f1f1f] text-white text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[#FFD700] uppercase">Contact the Editors</h2>
        <p className="mb-2">Email: warspirit@politics.org</p>
        <p className="mb-2">Phone: +383 123 456 789</p>
        <p className="mb-6">Headquarters: Prizren, Kosovo</p>
        <Button
          text="Send Message"
          onClick={() => alert("Opening Contact Form...")}
          className="border border-[#FFD700] text-[#FFD700] px-6 py-3 rounded hover:bg-[#FFD700] hover:text-black transition"
        />
      </motion.section>
    </div>
  );
}

Home.displayName = "War Spirit";
