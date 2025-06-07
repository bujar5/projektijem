import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
  const post = await res.json();
  return { props: { post } };
};

export default function Blog({ post }: any) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16 px-4">
      <div className="bg-white shadow-xl rounded-xl max-w-3xl w-full p-8 md:p-12 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          Static Site Generation (SSG) per Post ID: {post.id}
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-yellow-600 uppercase mb-6">
          {post.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">{post.body}</p>

        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition">
            Shiko Detajet
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition">
            Fshij Postin
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500 italic">
          Rendered at build time.
        </p>
      </div>
    </div>
  );
}

Blog.displayName = "Blog | My Application";
