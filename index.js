import express from 'express';
import 'dotenv/config';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import cartRouter from './routes/cartRoutes.js';




//Make database connection
const connectionString = process.env.MONGO_URI;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//create an express app
const app = express();

//use global middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// use routes
app.use("/api/v1", productsRouter);
app.use( "/api/v1", userRouter)
app.use("/api/v1/cart", cartRouter);


//listen for incoming request
const port= process.env.PORT || 3080;
app.listen( () => {
    console.log (`server is listening on port ${port}`);
});