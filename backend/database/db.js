const e = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected To MongoDB`);
  } catch (error) {
    console.log(e);
  }
};

module.exports = connectDB;
