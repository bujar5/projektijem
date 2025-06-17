// pages/api/blogs/index.ts
import { createBlog, getBlogs } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "../auth/[...nextauth]"; // Import your authOptions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // --- Server-side Authorization Check for POST (Create Blog) ---
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ message: "Not Authenticated: Please log in." });
    }

    if (session.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only administrators can create blogs." });
    }
    // --- End Authorization Check ---

    try {
      const newBlog = req.body;
      const result = await createBlog(newBlog);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating blog:", error); // Log the actual error for debugging
      res.status(500).json({ error: "Failed to create blog" });
    }
  } else if (req.method === "GET") {
    // GET (view blogs) is allowed for everyone (no session check needed here unless you want to filter based on roles)
    try {
      const blogs = await getBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  } else {
    res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur" });
  }
}