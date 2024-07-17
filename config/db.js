const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../.env` });

connectDB().catch((err) => console.log(err.message));

async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log(error.message);
  }
}

// connected
// error
// disconnected
// reconnected

mongoose.connection.on("connected", () => {
  console.log(`connected to mongodb database`);
});

mongoose.connection.on("error", (err) => {
  console.log(`${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongodb connection disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose disconnected through app termination");
  process.exit(0);
});
