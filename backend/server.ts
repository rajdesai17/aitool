// server.ts
import express from 'express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

const addressSchema = z.object({
  fullName: z.string().min(2).max(100),
  address1: z.string().min(5).max(100),
  address2: z.string().max(100).optional(),
  city: z.string().min(2).max(50),
  zipCode: z.string().min(5).max(10)
});

app.post('/api/save-address', (req, res) => {
  try {
    const validatedAddress = addressSchema.parse(req.body);
    // In a real app, you'd save this to a database
    // For MVP, we'll just return success
    res.json({ success: true, address: validatedAddress });
  } catch (error) {
    res.status(400).json({ error: 'Invalid address data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});