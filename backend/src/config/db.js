import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Error Connecting to Database: ");
        // process.exit(1)
    }
}