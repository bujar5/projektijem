
import { User } from "@/api/models/User"
import clientPromise from "@/lib/mongodb"

export async function createUser(data: User){
    const client = await clientPromise
    const db = client.db("myapp")
    const result = await db.collection("users").insertOne({
        ...data,
        createdAt: new Date(),
    });
    return result;
}

export async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db("myapp");
    const result = await db.collection("users").findOne({ email: email});
    return result;
}