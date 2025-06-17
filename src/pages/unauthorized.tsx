// pages/unauthorized.tsx
import Link from 'next/link';
import Head from 'next/head';

export default function UnauthorizedPage() {
  return (
    <>
      <Head>
        <title>Access Denied</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-8">
          You do not have permission to view this page.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Go to Home Page
        </Link>
      </div>
    </>
  );
}