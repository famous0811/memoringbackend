const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL =
  process.env.MONGO_URI || "mongodb://localhost:27017/memotemple";
const env = process.env.NODE_ENV || "development";

let mongoURL: any = MONGO_URL;
if (env !== "production") mongoURL += `_${env}`;
if (env === "development") {
  mongoose.set("debug", true);
}
module.exports = () =>
  mongoose.connect(mongoURL, (error) => {
    if (error) console.log("mongodb connection error", error);
    else console.log("mongodb connection");
  });
