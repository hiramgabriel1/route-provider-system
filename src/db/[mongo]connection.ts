import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  try {

    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URI);
    console.log('conectado');
    
} catch (error) {
    console.error(error);
  }
};

export default connection