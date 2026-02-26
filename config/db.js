const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDb;
