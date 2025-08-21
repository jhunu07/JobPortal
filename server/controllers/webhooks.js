import { Webhook } from 'svix';
import User from '../models/User.js';

export const config = {
  api: {
    bodyParser: false, // This disables body parsing so you can access raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get raw request body
  let rawBody = '';
  await new Promise((resolve, reject) => {
    req.on('data', chunk => {
      rawBody += chunk;
    });
    req.on('end', resolve);
    req.on('error', reject);
  });

  try {
    // Verify webhook
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const body = JSON.parse(rawBody);
    const { data, type } = body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          name: data.first_name + " " + data.last_name,
          resume: ''
        };
        await User.create(userData);
        return res.status(200).json({ message: "User created successfully" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          name: data.first_name + " " + data.last_name
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.json({ message: "User updated successfully" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ message: "User deleted successfully" });
      }

      default:
        return res.status(200).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: "Webhook verification failed" });
  }
}