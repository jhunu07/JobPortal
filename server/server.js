import express from 'express';
import cors from 'cors';
import connection from './config/db.js';
//import * as Sentry from '@sentry/node';

// Important for performance tracing if you use it

//import './config/instrument.js';
import clerkWebhooks  from './controllers/webhooks.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Sentry request handler (must be before routes & middlewares)
//app.use(Sentry.Handlers.requestHandler());

// Connect to MongoDB
await connection();

// Middleware
app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf; // Needed for Svix signature verification
  }
}));

// Routes
app.get('/', (req, res) => res.send('Working'));

// app.get('/debug-sentry', (req, res) => {
//   throw new Error('My first Sentry error!');
// });

app.post('/webhooks', clerkWebhooks);

// Sentry error handler (after routes)
// app.use(Sentry.Handlers.errorHandler());

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
