// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/api/models/User";
import { createUser, getUser } from "@/api/services/User";
import bcrypt from "bcryptjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("API /api/auth/register hit. Method:", req.method);

    // Ensure a response is sent for all paths
    try {
        if (req.method === "POST") {
            const { name, email, password } = req.body as User;

            if (!name || !email || !password) {
                console.log("Missing fields detected. Returning 400.");
                return res
                    .status(400)
                    .json({ error: "Ju lutem plotesoni te gjitha fushat" });
            }

            console.log("Attempting to get existing user by email:", email);
            const existingUser = await getUser(email);
            if (existingUser) {
                console.log("Existing user found. Returning 409.");
                return res
                    .status(409)
                    .json({ error: "Emaili eshte i rregjistruar tashme" });
            }

            console.log("Hashing password...");
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(), // Consider if this should be set by the database
            };

            console.log("Calling createUser with new user data.");
            const result = await createUser(newUser); // This is where createUser is called
            console.log("createUser returned. Result:", result);

            return res.status(201).json({
                message: "Perdoruesi u regjistrua me sukses",
                userId: result.insertedId,
            });
        } else {
            console.log("Method not allowed. Returning 405.");
            return res
                .status(405)
                .json({ error: "Metoda e kerkeses nuk eshte e mbeshtetur" });
        }
    } catch (error: any) {
        // Catch any unhandled errors that might occur
        console.error("Caught unhandled error in API route:", error);
        return res
            .status(500)
            .json({
                error: `Gabim gjate rregjistrimit: ${
                    error.message || "Unknown server error"
                }`,
            });
    }
}