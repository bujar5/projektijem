import { User } from "@/api/models/User";
import useFetch from "@/components/hooks/useFetch";
import { div } from "framer-motion/client";
import { useRouter } from "next/router"
import { useState } from "react";

export default function SignUp() {
const router = useRouter();
const [user, setUser] = useState({name: "", email: "", password: ""})
const [error, setError] = useState("")

const { post } = useFetch<User[]>("/api/auth/register")

const handleSubmit = async () => {
    const res = await post(user);

    if(res?.error) {
        setError(res.error);
    } else {
        router.push("/sign-in")
    }
};

    return(
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
            <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-black text-2xl font-semibold mb-4">
                Regjstrohu
            </h2>
            {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                    {error}
                </div>
            )}
            <input type="text"
            placeholder="Emri" 
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            />
            <input type="email"
            placeholder="Email" 
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            />
            <input type="password"
            placeholder="Password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            />
            <button onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                Regjistrohu
            </button>

            </div>
            </div>
        </div>
    );
}

SignUp.displayName = "Sign Up | My Application"