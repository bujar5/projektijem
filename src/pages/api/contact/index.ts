import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!

let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) return cachedClient

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any) // TypeScript workaround for Mongo options

  await client.connect()
  cachedClient = client
  return client
}

// Define the structure of the incoming request body
type ContactData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, email, phone, message } = req.body as ContactData

  // Server-side validation
  if (!firstName || !email || !message) {
    return res.status(400).json({
      error: 'First name, email, and message are required.',
    })
  }

  try {
    const client = await connectToDatabase()
    const db = client.db('myapp') // ← change this to your actual DB name
    const collection = db.collection('contacts')

    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      phone,
      message,
      createdAt: new Date(),
    })

    return res.status(200).json({
      success: true,
      insertedId: result.insertedId,
    })
  } catch (err) {
    console.error('Error saving contact message:', err)
    return res.status(500).json({
      error: 'Internal Server Error',
    })
  }
}
