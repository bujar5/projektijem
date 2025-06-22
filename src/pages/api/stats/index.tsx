// pages/api/stats/index.ts

import { getSession } from "next-auth/react";
// It's generally not needed to import authOptions here for getSession
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for GET request method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Create a context object that getSession expects for server-side usage
  // This explicitly includes req and res
  const context = { req, res };

  // Get the user's session to check for authentication and role
  const session = await getSession(context); // <-- CORRECTED CALL: Pass the context object

  // Authorization check: only allow authenticated users with 'admin' role
  // Use optional chaining for session.user just in case it's null/undefined
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("mypp"); // Your database name

    const [blogCount, newsCount, userCount] = await Promise.all([
      db.collection("blogs").countDocuments(),
      db.collection("news").countDocuments(),
      db.collection("users").countDocuments(),
    ]);

    res.status(200).json({ blogCount, newsCount, userCount });

  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
}