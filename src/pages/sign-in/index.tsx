// pages/sign-in/index.tsx
import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router"; // Correct import for useRouter

// Removed unused imports:
// import { Router } from "lucide-react"; // Not used in JSX
// import { div } from "framer-motion/client"; // Not used directly for motion components here
// import router from "next/router"; // Redundant, already importing useRouter

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const router = useRouter(); // Initialize useRouter hook

  const handleSubmit = async (e: React.FormEvent) => {
    setError(""); // Clear previous errors
    setIsLoading(true); // Set loading state
    e.preventDefault();

    // Basic client-side validation (optional, but good UX)
    if (!email || !password) {
      setError("Please enter your email and password.");
      setIsLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        setIsLoading(false);
        return;
    }


    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent NextAuth.js from doing a full redirect immediately
        email,
        password,
        csrfToken, // Pass the CSRF token if using it explicitly with forms (NextAuth handles this often automatically for credential provider)
      });

      if (res?.error) {
        setError(res.error); // Display error message from NextAuth.js
      } else if (res?.ok) { // Check for res.ok (true for successful sign-in)
        // If sign-in was successful and no explicit redirect URL from NextAuth, redirect to home
        router.push("/");
      }
      // Note: If 'redirect: true' was used, NextAuth would handle the redirect itself.
      // With 'redirect: false', you handle it manually based on 'res.url' or 'res.ok'.
      // If res.url is present, NextAuth suggests a redirect, often used for callback URLs.
      // If res.ok is true, it means credentials were valid.
    } catch (err: any) {
        console.error("Sign-in submission error:", err);
        setError(err.message || "An unexpected error occurred during sign-in.");
    } finally {
      setIsLoading(false); // Always stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Kyçu në llogarinë tënde
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Për të vazhduar në faqen tonë
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* CSRF token field, crucial for security with NextAuth.js */}
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
            disabled={isLoading} // Disable input while loading
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
            disabled={isLoading} // Disable input while loading
          />

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white transition-all duration-200 ease-in-out
              ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}
            `}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Kyçu"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Nuk keni një llogari?{" "}
          <span
            onClick={() => router.push("/sign-up")}
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition duration-150 ease-in-out"
          >
            Regjistrohu
          </span>
        </div>
      </div>
    </div>
  );
}

// getInitialProps is required to fetch the CSRF token on the server-side
// This makes the page server-side rendered or pre-rendered with the token.
SignIn.getInitialProps = async (context: any) => {
  return {
    csrfToken: (await getCsrfToken(context)) || null, // Ensure it's never undefined
  };
};

SignIn.displayName = "Sign In | My Application";