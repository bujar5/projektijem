// pages/news/index.tsx
import { News } from "@/api/models/News";
import useFetch from "@/components/hooks/useFetch";
import { useNewsContext } from "@/lib/contexts/NewsContext";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";


export default function NewsPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const { news, setNews } = useNewsContext();
    const { data, loading, remove } = useFetch<News[]>("/api/news");

    useEffect(() => {
        if (data) {
            setNews(data);
        }
    }, [data, setNews]);

    const handleDeleteNews = async (id: string) => {
        const confirmed = confirm(
            "A jeni i sigurt qe doni ta fshini kete lajm"
        );
        if (!confirmed) return;

        try {
            await remove(`/api/news/${id}`);
            alert("Lajmi u fshi me sukses");
            router.reload();
        } catch (error: unknown) {
            let errorMessage = 'Gabim i panjohur';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            alert(`Gabim gjate fshirjes se lajmit: ${errorMessage}`);
            console.error(error);
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-[#121212] flex flex-col items-center text-white">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <header className="py-10 text-center">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-[#FFD700] leading-tight mb-4 tracking-tight uppercase">
                        Lajmet Tona
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Qëndroni të informuar me lajmet më të fundit nga bota.
                        Një pasqyrë e thellë në botën e politikës.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-20 w-full">
                        <CircularProgress color="inherit" sx={{ color: '#FFD700' }} />
                    </div>
                ) : (
                    <div className="bg-[#1f1f1f] py-12 px-6 rounded-xl shadow-lg mb-12 border border-[#FFD700]/20">
                        <h2 className="text-3xl font-bold text-[#FFD700] mb-8 text-center uppercase">
                            Shfaqja e lajmeve nga databaza jone
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news && news.length > 0 ? (
                                news.map((post: News) => (
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
                                            <Link href={"/news/" + post._id} passHref legacyBehavior>
                                                <button className="flex-1 min-w-[120px] px-4 py-2 bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold rounded-lg transition duration-200 ease-in-out shadow-md text-sm text-center">
                                                    Lexo me shume
                                                </button>
                                            </Link>

                                            {session?.user?.role === "admin" && (
                                                <>
                                                    <Link href={"/update/news/" + post._id} passHref legacyBehavior>
                                                        <button className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-md text-sm text-center">
                                                            Përditëso
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteNews(post._id!)}
                                                        className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out shadow-md text-sm text-center"
                                                    >
                                                        Fshij postimin
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </motion.section>
                                ))
                            ) : (
                                <div className="col-span-full py-20 flex flex-col justify-center items-center text-gray-400">
                                    <p className="text-2xl font-semibold mb-4">
                                        Nuk ka lajme ne databaze
                                    </p>
                                    {session?.user?.role === "admin" && (
                                        <Link href={"/create/news"} passHref legacyBehavior>
                                            <button className="px-8 py-3 bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                                                Krijo Lajme
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        {news && news.length > 0 && session?.user?.role === "admin" && (
                            <div className="text-center pt-10 pb-4">
                                <Link href={"/create/news"} passHref legacyBehavior>
                                    <button className="px-8 py-3 bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold rounded-lg transition duration-200 ease-in-out shadow-lg">
                                        Krijo Lajme
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