const mongoose = require("mongoose");

// DB config
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const initDb = () => {
  try {
    async function connectDB() {
      await mongoose.connect(
        // `mongodb+srv://gallasathvika2001:${process.env.mongoPassword}@cluster0.row0apk.mongodb.net/${process.env.mongodbName}?retryWrites=true&w=majority`,
        process.env.mongo_url,
        connectionParams
      );
      console.log("Database connected succesfully");
    }
    connectDB();
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
};
module.exports = { initDb };
