import { config } from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/connectDB.js";
config();
const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
