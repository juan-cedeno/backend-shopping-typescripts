const mongoose = require("mongoose");

const connectionDb = () => {
  try {
    mongoose.connect(process.env.DBURLCONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectionDb,
};
