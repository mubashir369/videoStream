import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from './routes/userRoute.js'
import videoRouter from './routes/videoRoute.js'
import connect from "./config/db.js";
dotenv.config();
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected!");
})
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users',userRouter)
app.use('/api/video',videoRouter)

app.listen(5000, () => {
  connect()
  console.log("Connect to Backend");
});
