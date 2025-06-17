// pages/api/blogs/[id].ts
import { deleteBlog, getBlog, updateBlog } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";
import { Blog } from "@/api/models/Blog"; // Assuming Blog type is defined
import { ObjectId } from "mongodb"; // Ensure this import is correct if used in services
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "../auth/[...nextauth]"; // Import your authOptions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Common authorization check for PUT and DELETE
  if (req.method === "PUT" || req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ message: "Not Authenticated: Please log in." });
    }

    if (session.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only administrators can perform this action." });
    }
  }
  // End common authorization check

  if (req.method === "GET") {
    // GET (view single blog) is allowed for everyone
    try {
      const { id } = req.query;
      const blog = await getBlog(id as string);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  } else if (req.method === "PUT") {
    // Admin-only logic continues here for PUT
    try {
      const { id } = req.query;
      const newBlog: Blog = req.body;
      const result = await updateBlog(id as string, newBlog);
      res.status(200).json(result); // Use 200 for successful update
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  } else if (req.method === "DELETE") {
    // Admin-only logic continues here for DELETE
    try {
      const { id } = req.query;
      const blog = await deleteBlog(id as string);
      res.status(200).json({ message: "Blog deleted successfully" }); // Return success message
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  } else {
    res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur" });
  }
}