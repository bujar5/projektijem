// pages/sign-up/index.tsx
import { User } from "@/api/models/User";
import useFetch from "@/components/hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
// Removed: import { div } from "framer-motion/client"; as it's not used here directly for animation properties

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const { post } = useFetch<User[]>("/api/auth/register");

  const handleSubmit = async () => {
    setError(""); // Clear previous errors
    setIsLoading(true); // Set loading state

    // Basic client-side validation (optional, but good UX)
    if (!user.name || !user.email || !user.password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }


    try {
      const res = await post(user);

      if (res?.error) {
        setError(res.error);
      } else {
        // Clear form fields on successful registration
        setUser({ name: "", email: "", password: "" });
        router.push("/sign-in"); // Redirect to sign-in page
      }
    } catch (err: any) {
        // Catch any network or unexpected errors from useFetch itself
        console.error("Sign-up submission error:", err);
        setError(err.message || "An unexpected error occurred during registration.");
    } finally {
      setIsLoading(false); // Always stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Regjistrohu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Krijo një llogari të re
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Emri"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
            disabled={isLoading} // Disable input while loading
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
            disabled={isLoading} // Disable input while loading
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
            disabled={isLoading} // Disable input while loading
          />

          <button
            onClick={handleSubmit}
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
              "Regjistrohu"
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Keni tashmë një llogari?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition duration-150 ease-in-out"
          >
            Kyçuni
          </span>
        </div>
      </div>
    </div>
  );
}

SignUp.displayName = "Sign Up | My Application";