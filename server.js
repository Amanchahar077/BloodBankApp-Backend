const express = require("express");
const router = require("./routes/testRouter");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");

dotenv.config();

//mongodbconnection
connectDb();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

app.use("/api/v1", router);
app.use("/api/v1/auth", require("./routes/authRoutes"));


app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on ${process.env.PORT}`
      .bgBlue.white,
  );
});
