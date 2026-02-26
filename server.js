const express = require("express");
const router = require("./routes/testRouter")
const app = express();

const PORT = 8080;

app.use("/api/v1",router)

app.listen(PORT, () => {
  console.log("Server is running...");
});
