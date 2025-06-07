import { deleteBlog, getBlog, updateBlog } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";
import { Blog } from "@/api/models/Blog";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const blog = await getBlog(id as string);
            res.status(200).json(blog);
        } catch(error) {
            res.status(500).json(error);
        }
    }
    if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const newBlog: Blog = req.body;
            const result = await updateBlog(id as string, newBlog);
            res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
}

    if (req.method === "DELETE") {
     try {
            const { id } = req.query;
            const blog = await deleteBlog(id as string);
            res.status(200).json(blog);
        } catch(error) {
            res.status(500).json(error);
        }  
    }
}