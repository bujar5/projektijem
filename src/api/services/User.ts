import { User } from "@/api/models/User"
import clientPromise from "@/lib/mongodb"

// 👇 Default new users to "user" if no role is provided
export async function createUser(data: User) {
    const client = await clientPromise
    const db = client.db("myapp")
    const result = await db.collection("users").insertOne({
        ...data,
        role: data.role ?? "user", // 🆕 default to "user"
        createdAt: new Date(),
    });
    return result;
}

// ✅ getUser should return the full user object including role
export async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db("myapp");
    const result = await db.collection("users").findOne({ email: email });
    return result; // contains role
}
