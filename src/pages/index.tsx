import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.jpg";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import useFetch from "@/components/hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export interface Post{
 id:string;
 title: string;
 body: string;
}

export default function Home() {
  const {data: initialPosts, loading} = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
const [posts, setPosts] = useState<Post[] | null>(null);

useEffect(() => {
  if(initialPosts){
    setPosts(initialPosts);
  }
}, [initialPosts]);


const handleDelete = (id: string) => {
  if(posts){
    setPosts(posts.filter((post) => post.id !== id));
  }
}
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
        
        {/* Hero Section */}
        <motion.section
          className="w-full py-24 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black text-center shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Mirë se vini në aplikacionin tonë!
          </h1>
          <p className="text-xl max-w-xl mb-6 text-gray-900">
            Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
          </p>
          <Button
            text="Mëso më shumë"
            variant="secondary"
            onClick={() => alert("Redirecting")}
          />
        </motion.section>

        {/* About Section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Rreth nesh
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Ne krijojmë aplikacione të avancuara duke përdorur teknologjitë më të fundit.
            Fokusimi ynë kryesor është të ofrojmë produkte të optimizuara dhe SEO-Friendly.
          </p>
          <div className="flex justify-center">
            <Image
              src={CustomImage}
              alt="Imazh rreth nesh"
              width={500}
              height={300}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="w-full py-20 bg-white text-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6 text-yellow-600">
              Karakteristikat kryesore
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              <Card
                title="Shpejtësi & Performancë"
                description="Aplikacionet më të shpejta me optimizim të avancuar."
                icon={Rocket}
              />
              <Card
                title="SEO E Avancuar"
                description="Rankim më i mirë në motorët e kërkimit."
                icon={BarChart}
              />
              <Card
                title="Siguri Maksimale"
                description="Mbrojtje e të dhënave dhe siguri e lartë për përdoruesit."
                icon={ShieldCheck}
              />
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          className="w-full py-20 px-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Shërbimet tona
          </h2>
          <p className="text-gray-700 mb-8">
            Ofrojmë një gamë të gjerë shërbimesh për biznesin tuaj.
          </p>
          <Button
            text="Shikoni Shërbimet"
            onClick={() => alert("Redirecting...")}
          />
        </motion.section>   
        
        {/* Blog Section*/}
        <div className="grid grid-cols-3 py-20 bg-gray-200">
          {loading? (
          <CircularProgress/>
          ) : (
        <>
        {posts && posts?.map((post) => <motion.section
          key={post.id}
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ scale: 0.8 }}
          animate= {{ scale: 1 }}
          transition={{duration: 1}}

          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
              {post.title}
              </h2>
            <p className="text-gray-700 mb-6">{post.body}</p>
            <button onClick={() => handleDelete(post.id)}
             className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">Fshij postin</button>
        </motion.section>)}
        </>
        
        )}
        </div>
        {/* Contact Section */}
        <motion.section
          className="w-full py-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Kontaktoni me ne</h2>
          <p className="mb-2">Email: contact@mycompany.com</p>
          <p className="mb-2">Tel: +383 123 456 789</p>
          <p className="mb-6">Adresa: Prizren, Kosovë</p>
          <Button
            text="Na Kontaktoni"
            variant="secondary"
            onClick={() => alert("Opening Contact Form...")}
          />
        </motion.section>
      </div>
    </div>
  );
}

Home.displayName = "My application";
