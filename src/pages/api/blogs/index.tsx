import { createBlog, getBlogs } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const newBlog = req.body;
      const result = await createBlog(newBlog);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create blog" });
    }
  } else if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch blogs" });
    }
  } else {
    return res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur" });
  }
}
