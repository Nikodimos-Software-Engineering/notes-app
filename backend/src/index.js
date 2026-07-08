import express from "express";
import notesRouter from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== "production") {
    app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

app.use((req, res) => {
    if (process.env.NODE_ENV === "production" && !req.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: ", PORT);
    });
});