// pages/api/agreements/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("Request method is:", req.method);
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method not allowed' });
  // }

  try {
    const { firstName, lastName, signature, shift, timeStamp } = req.body;

    // Basic validation
    if (!firstName || !lastName || !signature || !shift || !timeStamp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Convert the timeStamp to a Date object.
    const date = new Date(timeStamp);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Insert the new policy agreement record into the database
    const newAgreement = await prisma.policyAgreement.create({
      data: {
        firstName,
        lastName,
        signature,
        shift: shift, // Ensure shiftTime is either "Lunch" or "Dinner" as defined in your Prisma enum.
        timeStamp: date,
      },
    });

    return res.status(200).json(newAgreement);
  } catch (error) {
    console.error('Error saving agreement:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
