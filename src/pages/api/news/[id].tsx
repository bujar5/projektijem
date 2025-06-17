// pages/api/news/[id].ts
import { deleteNews, getSingleNews, updateNews } from "@/api/services/News";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "../auth/[...nextauth]"; // Import your authOptions

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    // GET (view single news) is allowed for everyone
    try {
      const { id } = req.query;
      const news = await getSingleNews(id as string);
      if (!news) {
        return res.status(404).json({ message: "Lajmi nuk u gjet" }); // News not found
      }
      res.status(200).json(news);
    } catch (error) {
      console.error("Error fetching single news:", error);
      res.status(500).json({ message: "Gabim gjate marrjes se lajmeve" });
    }
  } else if (req.method === "PUT") {
    // Admin-only logic continues here for PUT
    try {
      const { id } = req.query;
      const data = req.body;
      const news = await updateNews(id as string, data);
      res.status(200).json(news);
    } catch (error) {
      console.error("Error updating news:", error);
      res.status(500).json({ message: "Gabim gjate perditesimit te lajmit" });
    }
  } else if (req.method === "DELETE") {
    // Admin-only logic continues here for DELETE
    try {
      const { id } = req.query;
      const news = await deleteNews(id as string);
      res.status(200).json({ message: "Lajmi u fshi me sukses" }); // News deleted successfully
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ message: "Gabim gjate fshirjes se lajmit" });
    }
  } else {
    res.status(405).json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur" });
  }
}