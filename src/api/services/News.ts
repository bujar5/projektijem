import clientPromise from "@/lib/mongodb";
import { News } from "../models/News";
import { ObjectId } from "mongodb";

export async function createNews(data: News) {
    const client = await clientPromise;
    const db = client.db("myapp");

    // Don't destructure _id if it's not needed
    const { _id: _, ...newsData } = data;

    const result = await db.collection("news").insertOne({
        ...newsData,
        createdAt: new Date(),
    });

    return result;
}

export async function getNews() {
    const client = await clientPromise;
    const db = client.db("myapp");

    const news = await db
        .collection("news")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    return news;
}

export async function getSingleNews(id: string) {
    const client = await clientPromise;
    const db = client.db("myapp");

    const news = await db
        .collection("news")
        .findOne({ _id: new ObjectId(id) });

    return news;
}

export async function updateNews(id: string, data: News) {
    const client = await clientPromise;
    const db = client.db("myapp");

    const result = await db
        .collection("news")
        .updateOne({ _id: new ObjectId(id) }, { $set: data });

    return result;
}

export async function deleteNews(id: string) {
    const client = await clientPromise;
    const db = client.db("myapp");

    const result = await db
        .collection("news")
        .deleteOne({ _id: new ObjectId(id) });

    return result;
}
