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
      <div className="flex justify-center items-center min-h-screen pt-20 bg-[#121212]">
        <CircularProgress sx={{ color: '#FFD700' }} />
      </div>
    );
  }

  // Show an error message if the fetch failed (e.g., network error, 500 from API)
  if (error) {
    console.error("Error fetching blog on client:", error);

    // FIX START: Safely extract the message regardless of the 'error' type
    let displayErrorMessage = "Një gabim i panjohur ndodhi gjatë marrjes së të dhënave.";

    // Type guard to handle various error types returned by useFetch
    if (typeof error === 'string') {
        // If the error is directly a string
        displayErrorMessage = error;
    } else if (typeof error === 'object' && error !== null) {
        // If it's an object, check for a 'message' property
        if ('message' in error) {
            // Ensure the 'message' property is a string
            if (typeof (error as any).message === 'string') {
                displayErrorMessage = (error as any).message;
            }
        }
        // You could also check for 'name' or other properties if your errors have them
    }
    // FIX END

    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#121212] text-red-500 text-xl font-semibold">
        <p>Gabim gjatë ngarkimit të blogut: {displayErrorMessage}</p>
        <Link href="/blogs" passHref legacyBehavior>
          <button className="mt-8 px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-yellow-400 transition shadow-md">
            Kthehu te Blogjet
          </button>
        </Link>
      </div>
    );
  }

  // Show a "not found" message if no blog data was returned
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#121212] text-gray-400 text-xl font-semibold">
        <p>Blogu nuk u gjet. Ky ID mund të mos ekzistojë ose të jetë fshirë.</p>
        <Link href="/blogs" passHref legacyBehavior>
          <button className="mt-8 px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-yellow-400 transition shadow-md">
            Kthehu te Blogjet
          </button>
        </Link>
      </div>
    );
  }

  // If blog data is successfully loaded, render the blog post
  return (
    <div className="pt-20 min-h-screen bg-[#121212] flex flex-col items-center text-white">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg border border-[#FFD700]/20"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#FFD700] leading-tight mb-6 text-center">
            {blog.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {blog.body}
          </p>
          {/* You can add more blog-specific fields here if your Blog model has them */}

          <div className="flex justify-between items-center border-t border-gray-700 pt-6 flex-wrap gap-4">
            <Link href="/blogs" passHref legacyBehavior>
              <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out shadow-md">
                Kthehu te Blogjet
              </button>
            </Link>
            {/* Conditional rendering for admin actions */}
            {session?.user?.role === "admin" && (
                <Link href={`/update/blog/${blog._id}`} passHref legacyBehavior>
                    <button className="px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-200 ease-in-out shadow-md">
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

SingleBlogPage.displayName = "Single Blog | War Spirit";

// Optional: You can add getServerSideProps here if you want to pre-fetch data on the server
// for better SEO or initial page load performance, or for server-side authentication.
// import { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';
// import { getBlog } from '@/api/services/Blog'; // Assuming you have this service function
//
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);
//
//   // Example: Protecting this page if only logged-in users can view single blogs
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/sign-in', // Redirect to your login page
//         permanent: false,
//       },
//     };
//   }
//
//   // Fetch blog data on the server side using the ID from context.params
//   const { id } = context.params as { id: string }; // Cast params to ensure 'id' is string
//   let blogData = null;
//   try {
//     blogData = await getBlog(id); // Call your backend service to fetch the blog
//   } catch (error) {
//     console.error("Server-side error fetching blog:", error);
//     // Optionally redirect to a 404 page or return empty props
//     return { notFound: true };
//   }
//
//   if (!blogData) {
//     return { notFound: true }; // Return 404 if blog is not found
//   }
//
//   return {
//     props: {
//       blog: JSON.parse(JSON.stringify(blogData)), // Serialize data if it contains non-plain objects (e.g., Dates, ObjectIds)
//       session, // Pass session data if needed on the client-side
//     },
//   };
// }