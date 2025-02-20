// pages/api/SignatureList/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { shift, timestamp } = req.body;

    if (!shift || !timestamp) {
      return res.status(400).json({ message: 'Missing required fields: shift and timestamp' });
    }

    // Parse the timestamp from the format "MM/DD/YYYY"
    const [month, day, year] = timestamp.split('/');
    const startDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
    const endDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10) + 1);

    // Query agreements matching the provided shift and the day range
    const agreements = await prisma.policyAgreement.findMany({
      where: {
        shift, // Ensure that shift value exactly matches your enum (e.g., "Lunch" or "Dinner")
        timeStamp: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(agreements);
  } catch (error) {
    console.error('Error retrieving agreements:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
