import express from "express";
import notesRouter from "./routes/notesRouter.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
// import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors())

app.use(express.json());

// app.use(rateLimiter);

app.use("/api/notes", notesRouter);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: ", PORT);
    })
})
