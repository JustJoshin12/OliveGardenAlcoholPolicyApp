// pages/api/auth/signup.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, username, email, password } = req.body;

  // Validate incoming data
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if a user with the given email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User with that email or username already exists' });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
