import mongoose from "mongoose";
import dotenv from "dotenv";
import { deleteDataCronJob } from "../middlewares/cronjob";

dotenv.config();
const URI: string = process.env.MONGO_URI || '';
const connection = async () => {
  try {

    let connection = await mongoose.connect(URI);

    if(connection) deleteDataCronJob()
        
} catch (error) {
    console.error(error);
  }
};

export default connection