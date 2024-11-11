import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express';
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obf(to identify which user had loged in)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB  max file size
    },
}));


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

//error handler 
app.use((err,req,re,next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message});
})

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
    connectDB();
});

 //todo socket io