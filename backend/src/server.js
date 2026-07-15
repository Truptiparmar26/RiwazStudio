import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import connectDatabase from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

await connectDatabase();

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Riwaz Studio Backend API is running 🚀"
  });
});
app.listen(port, () => {
  console.log(`Riwaz Studio backend running on http://localhost:${port}`);
});
