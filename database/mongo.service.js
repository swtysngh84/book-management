const mongoose = require("mongoose");

const connect = () => {
  const connectionString = process.env.MONGO_CONNECTION_URL;
  if (!connectionString?.length) {
    throw Error("MONGO_URL env var is not defined.");
  }
  mongoose.connection.on("connected", () => {
    console.log(`MongoDB connected to LOCAL database server`);
  });

  // If the connection throws an error
  mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error", error);
  });
  return mongoose.connect(connectionString);
};

module.exports = {
  connect,
};
