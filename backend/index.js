import express from "express";
import db from "./config/db.js"
import bukuRoutes from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use(bukuRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});