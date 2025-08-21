import connectDB from '../../utils/db.js'; // The optimized MongoDB connection file
import User from '../../models/User.js';   // Your Mongoose model

export const config = {
  api: {
    bodyParser: true, // or false if you want raw body
  },
};

export default async function handler(req, res) {
  try {
    // Connect to MongoDB (reuses connection if already connected)
    await connectDB();

    if (req.method === 'POST') {
      const { name, email, password } = req.body;

      // Simple validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Create new user
      const newUser = await User.create({ name, email, password });

      return res.status(201).json({ message: 'User created', user: newUser });
    } else {
      // Method not allowed
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Function error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
