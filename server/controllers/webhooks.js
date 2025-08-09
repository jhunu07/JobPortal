import { Webhook } from 'svix';
import User from '../models/User.js';

 const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    // Extracting the event from the request body
    const { data, type } = req.body;

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
};
export default clerkWebhooks;