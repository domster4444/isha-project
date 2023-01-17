//? config app
const express = require("express");
const app = express();

//?config dotenv file
const dotenv = require("dotenv");
dotenv.config({ path: "./configs/config.env" });

//?config cors
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);
//?connect to db
// const connectDB = require("./configs/database");
//connect to db
// const DATABASE_URL = process.env.DATABASE_URL;
// connectDB(DATABASE_URL);

//?config cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//?config body-parser
app.use(express.json({ limit: "50mb" })); //? allow body parsing to be up to 50mb
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //? allow body parsing to be up to 50mb

//?config morgan
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//todo: routes imports
const testRoutes = require("./routes/testRoutes");
app.use("/api/v1", testRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server working fine",
  });
});

//?config globalErrorMiddleware
const globalErrorMiddleware = require("./middlewares/globalErrorMiddleware");
app.use(globalErrorMiddleware);

module.exports = app;
