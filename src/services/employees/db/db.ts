import mongoose from "mongoose";
import dotenv from "dotenv";
// import colors from "colors"

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

export const employeesDatabaseConnection = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(MONGO_URI);
    console.log("employees api connected");
    
  } catch (error) {
    console.error(error);
  }
};