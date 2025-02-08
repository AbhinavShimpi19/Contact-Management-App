const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected: ${connect.connection.host}, DB: ${connect.connection.name}`);
  } catch (err) {
    console.error(`Database Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;


// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.CONNECTION_STRING);

//     console.log(`Database Connected: ${connect.connection.host}, DB: ${connect.connection.name}`);
//   } catch (err) {
//     console.error(`Database Connection Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;
