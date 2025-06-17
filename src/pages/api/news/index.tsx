// pages/api/news/index.ts
import { createNews, getNews } from "@/api/services/News";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "../auth/[...nextauth]"; // Import your authOptions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // --- Server-side Authorization Check for POST (Create News) ---
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ message: "Not Authenticated: Please log in." });
    }

    if (session.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only administrators can create news." });
    }
    // --- End Authorization Check ---

    try {
      const newNews = req.body;
      const result = await createNews(newNews);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating news:", error); // Log the actual error for debugging
      res.status(500).json({ error: "Gabim gjate krijimit te lajmit" });
    }
  } else if (req.method === "GET") {
    // GET (view news) is allowed for everyone
    try {
      const news = await getNews();
      res.status(200).json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Gabim gjate marrjes se lajmit" });
    }
  } else {
    res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur" });
  }
}