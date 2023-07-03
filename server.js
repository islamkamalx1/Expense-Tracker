const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const transactionsRouter = require("./routes/transactions");

app.use("/api/v1/transactions", transactionsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `server listening in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
