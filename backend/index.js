import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./DB/dbConnection.js";
import authRoute from "./routers/auth.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5001;


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

  

app.use("/api/auth",authRoute)




async function startServer() {
  try {
    await connectToDatabase(); 

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();