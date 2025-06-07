//Incremental Static Regeneration (ISR)

import { div } from "framer-motion/client";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async ()=>{
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
    const post = await res.json();
    return { 
    props: { post },
    revalidate: 10,
};
  };

  export default function Blog({post}: any){
    return <div className="pt-12 px-20 flex flex-col items-center justify-center min-h-screen gap-y-20">
        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
            Incremental Static Regeneration per Post Id: {post.id}
        </h1>
        <h2 className="text-4xl text-ceter font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">{post.title}</h2>
        <p className="text-gray-700 mb-6">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">Rifreskohet automatikisht cdo 10 sekonda ne sfond</p>
    </div>
  }

  Blog.displayName = "Blog | My Application"