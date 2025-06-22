import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '@/lib/mongodb';

// Define response types
interface SuccessResponse {
  blogCount: number;
  newsCount: number;
  userCount: number;
}

interface ErrorResponse {
  message: string;
}

type StatsResponse = SuccessResponse | ErrorResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<StatsResponse>) {
  // Check for GET request method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` } as ErrorResponse);
  }

  try {
    // Get the user's session
    const session = await getServerSession(req, res, authOptions);

    // Authorization check
    if (!session || session.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' } as ErrorResponse);
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('myapp'); // Fixed potential typo from 'mypp' to 'myapp'

    // Fetch counts
    const [blogCount, newsCount, userCount] = await Promise.all([
      db.collection('blogs').countDocuments(),
      db.collection('news').countDocuments(),
      db.collection('users').countDocuments(),
    ]);

    // Return success response
    res.status(200).json({ blogCount, newsCount, userCount } as SuccessResponse);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' } as ErrorResponse);
  }
}
