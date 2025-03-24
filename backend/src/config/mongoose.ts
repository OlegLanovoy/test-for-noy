import { connect } from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const connectToDB = async () => {
  if (!MONGO_DB_URI) {
    throw new Error("MONGO_DB_URI is not defined in .env file");
  }
  try {
    const db = await connect(MONGO_DB_URI);
    console.log('MongoDB connected to', db.connection.name);
  } catch (error) {
    console.error(error);
  }
};