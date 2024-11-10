import mongoose from "mongoose";

export const connectDB = async () => {
try {
   const conn = await mongoose.connect(process.env.MONGODB_URI);
   console.log(`connected to mongodb ${conn.connection.host}`);
} catch (error) {
    console.log("failed to connect to mongodb");
    process.exit(1);

}
}