// pages/news/[id].tsx
import { useRouter } from 'next/router';
import useFetch from '@/components/hooks/useFetch'; // Verify this path
import { CircularProgress } from '@mui/material';
import { News } from '@/api/models/News'; // Verify this path
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function SingleNewsPage() {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic 'id' from the URL

  console.log("Frontend - Router ID received in [id].tsx:", id); // Add for debugging

  const { data: session } = useSession();

  // Fetch the single news article using its ID
  const { data: newsItem, loading, error } = useFetch<News>(id ? `/api/news/${id}` : null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching news on client:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 text-red-600 text-xl font-semibold">
        <p>Gabim gjatë ngarkimit të lajmit: {error.message || "Një gabim i panjohur ndodhi."}</p>
        <Link href="/news">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kthehu te Lajmet
          </button>
        </Link>
      </div>
    );
  }

  if (!newsItem) {
    // This handles cases where the API returns 404 or null data because the news item wasn't found
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 text-gray-700 text-xl font-semibold">
        <p>Lajmi nuk u gjet. Ky ID mund të mos ekzistojë ose të jetë fshirë.</p>
        <Link href="/news">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kthehu te Lajmet
          </button>
        </Link>
      </div>
    );
  }

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
            {newsItem.title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {newsItem.body}
          </p>
          {/* You can add more details like author, date, image if available in your News model */}

          <div className="flex justify-between items-center border-t border-gray-100 pt-6">
            <Link href="/news">
              <button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out shadow-md">
                Kthehu te Lajmet
              </button>
            </Link>
            {session?.user?.role === "admin" && (
                <Link href={`/update/news/${newsItem._id}`}>
                    <button className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200 ease-in-out shadow-md">
                        Përditëso Lajmin
                    </button>
                </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

SingleNewsPage.displayName = "Single News | My Application";

// Optional: Add getServerSideProps if you want server-side data fetching for better SEO or authentication
// import { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);

//   // If you want this page to be protected:
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // The component will fetch data client-side with useFetch
//   };
// }