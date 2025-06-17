// pages/admin/dashboard.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
// import { getSession } from "next-auth/react"; // No longer needed for route protection here
import Head from "next/head"; // Don't forget Head for page title/meta

// Remove getServerSideProps
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session || session.user.role !== "admin") {
//     return {
//       redirect: { destination: "/unauthorized", permanent: false },
//     };
//   }
//   return { props: { session } };
// }

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogCount: 0,
    newsCount: 0,
    userCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Your /api/admin/stats route is now protected by middleware
      // IMPORTANT: Keep the correct fetch path as per your working setup (e.g., /api/stats or /api/admin/stats)
      const res = await fetch("/api/stats"); // Keeping original fetch path as per your working confirmation
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        // Handle error, e.g., if fetch fails due to middleware blocking
        console.error("Failed to fetch admin stats:", await res.json());
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title> {/* Add a title for the page */}
      </Head>
      <div className="min-h-screen bg-gray-50 p-6 sm:p-10 lg:p-14"> {/* Added min-h-screen, bg-gray-50, and responsive padding */}
        <div className="max-w-7xl mx-auto"> {/* Added max-w-7xl and mx-auto for centering */}
          {/* Header Section */}
          <header className="mb-10 text-center md:text-left"> {/* Added text-center/left for responsiveness */}
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2"> {/* Larger font, bolder, tighter line height */}
              Paneli i Administratorit
            </h1>
            <p className="text-lg text-gray-600">
              Menaxhoni përmbajtjen dhe përdoruesit e faqes tuaj.
            </p>
          </header>

          {/* Stats Section */}
          <section className="mb-12"> {/* Added margin-bottom */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Përmbledhja</h2> {/* Larger font, bolder, consistent margin */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid, increased gap */}
              {/* Stat Card: Total Blogs */}
              <div className="bg-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 duration-300 ease-in-out"> {/* Modern card styling */}
                <h3 className="text-lg font-medium text-gray-500">Total Blogs</h3> {/* Subtler heading for stats */}
                <p className="text-4xl font-extrabold text-blue-600 mt-1">{stats.blogCount}</p> {/* Larger, bolder number with color */}
              </div>

              {/* Stat Card: Total News */}
              <div className="bg-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 duration-300 ease-in-out"> {/* Modern card styling */}
                <h3 className="text-lg font-medium text-gray-500">Total News</h3>
                <p className="text-4xl font-extrabold text-green-600 mt-1">{stats.newsCount}</p>
              </div>

              {/* Stat Card: Total Users */}
              <div className="bg-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 duration-300 ease-in-out"> {/* Modern card styling */}
                <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
                <p className="text-4xl font-extrabold text-purple-600 mt-1">{stats.userCount}</p>
              </div>
            </div>
          </section>

          {/* Quick Actions Section */}
          <section> {/* New section for quick actions */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Veprime të Shpejta</h2> {/* Consistent heading style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Responsive grid for buttons */}
              {/* IMPORTANT: Update these links if you create dedicated /admin/blogs/create etc. */}
              <Link href="/create/blog">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"> {/* Full width, larger padding, rounded, shadow, hover effect */}
                  + New Blog
                </button>
              </Link>
              <Link href="/create/news">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"> {/* Same styling for consistency */}
                  + New News
                </button>
              </Link>
              {/* These links below usually go to general listing pages, where edit/delete buttons are conditional */}
              <Link href="/blogs">
                <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"> {/* Darker buttons for management, consistent styling */}
                  Manage Blogs
                </button>
              </Link>
              <Link href="/news">
                <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"> {/* Same styling */}
                  Manage News
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}