// pages/news/index.tsx
import { News } from "@/api/models/News";
import useFetch from "@/components/hooks/useFetch";
import { useNewsContext } from "@/lib/contexts/NewsContext"; // Assuming this context is still relevant
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession

export default function NewsPage() {
    const router = useRouter();
    const { data: session } = useSession(); // Get the session data

    const { news, setNews } = useNewsContext(); // Assuming this context is correctly providing/managing news data
    const { data, loading, remove } = useFetch<News[]>("/api/news");

    useEffect(() => {
        if (data) {
            setNews(data);
        }
    }, [data, setNews]);

    const handleDeleteNews = async (id: string) => {
        const confirmed = confirm(
            "A jeni i sigurt qe doni ta fshini kete lajm" // Are you sure you want to delete this news?
        );
        if (!confirmed) return;

        try {
            await remove(`/api/news/${id}`); // This hits your protected DELETE API
            alert("Lajmi u fshi me sukses"); // News deleted successfully
            router.reload(); // Reload the page to reflect changes
        } catch (error: unknown) {
            let errorMessage = 'Gabim i panjohur'; // Unknown error
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            alert(`Gabim gjate fshirjes se lajmit: ${errorMessage}`); // Error deleting news
            console.error(error);
        }
    };

    return (
        // Added parentheses here to wrap the JSX structure
        <div className="pt-20 min-h-screen bg-gray-50 flex flex-col items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                {/* Main Header for the News Page */}
                <header className="py-10 text-center">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                        Lajmet Tona {/* Updated header text */}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Qëndroni të informuar me lajmet më të fundit nga bota. {/* Updated header sub-text */}
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-20 w-full">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="bg-white py-12 px-6 rounded-xl shadow-lg mb-12 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Shfaqja e lajmeve nga databaza jone {/* Displaying news from our database */}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news && news.length > 0 ? (
                                news.map((post: News) => (
                                    <motion.section
                                        key={post._id}
                                        className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-gray-100"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-purple-700 line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 flex-grow line-clamp-4 text-sm md:text-base">
                                            {post.body}
                                        </p>
                                        <div className="flex justify-center items-center mt-auto pt-4 border-t border-gray-100 flex-wrap gap-2">
                                            <Link href={"/news/" + post._id}>
                                                <button className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-md text-sm text-center">
                                                    Lexo me shume {/* Read more */}
                                                </button>
                                            </Link>

                                            {/* CONDITIONAL RENDERING FOR ADMIN ACTIONS */}
                                            {session?.user?.role === "admin" && (
                                                <>
                                                    <Link href={"/update/news/" + post._id}>
                                                        <button className="flex-1 min-w-[120px] px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-md text-sm text-center">
                                                            Përditëso {/* Update */}
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteNews(post._id!)}
                                                        className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out shadow-md text-sm text-center"
                                                    >
                                                        Fshij postimin {/* Delete post */}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </motion.section>
                                ))
                            ) : (
                                <div className="col-span-full py-20 flex flex-col justify-center items-center text-gray-600">
                                    <p className="text-2xl font-semibold mb-4">
                                        Nuk ka lajme ne databaze {/* No news in the database */}
                                    </p>
                                    {/* Conditional create news button here if news is empty and admin */}
                                    {session?.user?.role === "admin" && (
                                        <Link href={"/create/news"}>
                                            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                                                Krijo Lajme {/* Create news */}
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* "Krijo Lajme" button for admin, outside the loop if news exists */}
                        {news && news.length > 0 && session?.user?.role === "admin" && (
                            <div className="text-center pt-10 pb-4">
                                <Link href={"/create/news"}>
                                    <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                                        Krijo Lajme {/* Create news */}
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

NewsPage.displayName = "News | My Application";