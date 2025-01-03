const express = require("express");
const router = require("./router/auth");
const routerexpense = require("./router/expense");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.get("/", (req , res)=>{
  res.json({
    message: "run"
  })
})
app.use("/auth/v1", router);
app.use("/user/v1", routerexpense);


app.listen(PORT, () => {
  console.log("Server is running 3000");
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
