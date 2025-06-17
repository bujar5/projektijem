import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const client = await clientPromise;
  const db = client.db("myapp");

  const [blogCount, newsCount, userCount] = await Promise.all([
    db.collection("blogs").countDocuments(),
    db.collection("news").countDocuments(),
    db.collection("users").countDocuments(),
  ]);

  res.status(200).json({ blogCount, newsCount, userCount });
}
