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
      <div className="flex justify-center items-center min-h-screen pt-20 bg-[#121212]"> {/* Added dark theme background */}
        <CircularProgress sx={{ color: '#FFD700' }} /> {/* Added color for dark theme */}
      </div>
    );
  }

  if (error) {
    console.error("Error fetching news on client:", error);

    // FIX START: Safely extract the message regardless of the 'error' type
    let displayErrorMessage = "Një gabim i panjohur ndodhi gjatë marrjes së të dhënave.";

    if (typeof error === 'string') {
        displayErrorMessage = error;
    } else if (typeof error === 'object' && error !== null) {
        if ('message' in error) {
            if (typeof (error as any).message === 'string') {
                displayErrorMessage = (error as any).message;
            }
        }
    }
    // FIX END

    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#121212] text-red-500 text-xl font-semibold"> {/* Added dark theme background and red text */}
        <p>Gabim gjatë ngarkimit të lajmit: {displayErrorMessage}</p>
        <Link href="/news" passHref legacyBehavior> {/* Added passHref and legacyBehavior */}
          <button className="mt-8 px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-yellow-400 transition shadow-md"> {/* Updated button styling */}
            Kthehu te Lajmet
          </button>
        </Link>
      </div>
    );
  }

  if (!newsItem) {
    // This handles cases where the API returns 404 or null data because the news item wasn't found
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#121212] text-gray-400 text-xl font-semibold"> {/* Added dark theme background and gray text */}
        <p>Lajmi nuk u gjet. Ky ID mund të mos ekzistojë ose të jetë fshirë.</p>
        <Link href="/news" passHref legacyBehavior> {/* Added passHref and legacyBehavior */}
          <button className="mt-8 px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-yellow-400 transition shadow-md"> {/* Updated button styling */}
            Kthehu te Lajmet
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-[#121212] flex flex-col items-center text-white"> {/* Updated main container background and text color */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg border border-[#FFD700]/20" /* Updated background, shadow, border */
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#FFD700] leading-tight mb-6 text-center"> {/* Updated text color */}
            {newsItem.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8"> {/* Updated text color */}
            {newsItem.body}
          </p>
          {/* You can add more details like author, date, image if available in your News model */}

          <div className="flex justify-between items-center border-t border-gray-700 pt-6 flex-wrap gap-4"> {/* Updated border color and flex-wrap */}
            <Link href="/news" passHref legacyBehavior> {/* Added passHref and legacyBehavior */}
              <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out shadow-md"> {/* Updated button styling */}
                Kthehu te Lajmet
              </button>
            </Link>
            {session?.user?.role === "admin" && (
                <Link href={`/update/news/${newsItem._id}`} passHref legacyBehavior> {/* Added passHref and legacyBehavior */}
                    <button className="px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-200 ease-in-out shadow-md"> {/* Updated button styling */}
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

SingleNewsPage.displayName = "Single News | War Spirit"; // Updated display name

// Optional: Add getServerSideProps if you want server-side data fetching for better SEO or authentication
// import { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);

//   // If you want this page to be protected:
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // The component will fetch data client-side with useFetch
//   };
// }