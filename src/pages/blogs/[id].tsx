// pages/blogs/[id].tsx
import { useRouter } from 'next/router';
import useFetch from '@/components/hooks/useFetch'; // Verify this path based on your project structure
import { CircularProgress } from '@mui/material'; // Assuming you have MUI installed for loaders
import { Blog } from '@/api/models/Blog'; // Ensure this path is correct for your Blog model
import { motion } from 'framer-motion'; // Assuming you use framer-motion for animations
import Link from 'next/link'; // For navigation back to the blog list
import { useSession } from "next-auth/react"; // For checking user role (e.g., for admin actions)

export default function SingleBlogPage() {
  const router = useRouter();
  const { id } = router.query; // This extracts the dynamic part of the URL (the blog ID)

  // Optional: Console log for debugging to see the ID in the browser console
  console.log("Frontend - Router ID received in [id].tsx for Blog:", id);

  const { data: session } = useSession(); // Get the user session for role-based rendering

  // Use your custom useFetch hook to get the blog data
  // The fetch URL is constructed using the ID from the router query
  // It only attempts to fetch if 'id' is available (not undefined yet from router)
  const { data: blog, loading, error } = useFetch<Blog>(id ? `/api/blogs/${id}` : null);

  // --- Conditional Rendering based on fetch state ---

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <CircularProgress />
      </div>
    );
  }

  // Show an error message if the fetch failed (e.g., network error, 500 from API)
  if (error) {
    console.error("Error fetching blog on client:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 text-red-600 text-xl font-semibold">
        <p>Gabim gjatë ngarkimit të blogut: {error.message || "Një gabim i panjohur ndodhi."}</p>
        <Link href="/blogs">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kthehu te Blogjet
          </button>
        </Link>
      </div>
    );
  }

  // Show a "not found" message if no blog data was returned (e.g., API returned 404)
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 text-gray-700 text-xl font-semibold">
        <p>Blogu nuk u gjet. Ky ID mund të mos ekzistojë ose të jetë fshirë.</p>
        <Link href="/blogs">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kthehu te Blogjet
          </button>
        </Link>
      </div>
    );
  }

  // If blog data is successfully loaded, render the blog post
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 text-center">
            {blog.title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {blog.body}
          </p>
          {/* You can add more blog-specific fields here if your Blog model has them */}
          {/* For example, blog.author, blog.date, blog.imageUrl etc. */}

          <div className="flex justify-between items-center border-t border-gray-100 pt-6">
            <Link href="/blogs">
              <button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out shadow-md">
                Kthehu te Blogjet
              </button>
            </Link>
            {/* Conditional rendering for admin actions */}
            {session?.user?.role === "admin" && (
                <Link href={`/update/blog/${blog._id}`}>
                    <button className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200 ease-in-out shadow-md">
                        Përditëso Blogun
                    </button>
                </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

SingleBlogPage.displayName = "Single Blog | My Application";

// Optional: You can add getServerSideProps here if you want to pre-fetch data on the server
// for better SEO or initial page load performance, or for server-side authentication.
// import { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';
//
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);
//
//   // Example: Protecting this page if only logged-in users can view single blogs
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/', // Redirect to your login or home page
//         permanent: false,
//       },
//     };
//   }
//
//   // If you were fetching data here, you'd pass it as props:
//   // const { id } = context.params;
//   // const blog = await getBlog(id as string); // Call your backend service
//   // return {
//   //   props: { blog }, // Pass blog data as props
//   // };
//
//   return { props: {}, }; // If useFetch is used client-side
// }