// // const mongoose = require('mongoose')
// const mongoose = require("mongoose")

// // const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb/taxi-booking'
// const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb/taxi-booking'

//  // mongodb+srv://nykoyunoglu:GW2cZ6iKlRPncgEg@cluster0.jpfoorp.mongodb.net/gcp-taxi-booking?retryWrites=true&w=majority&appName=Cluster0
// // mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(connectionString)

// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('we are connected to mongodb!')
//   console.log(`${connectionString}`)
// })
const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb://localhost:27017/taxi-booking";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected to mongodb!");
  console.log(`${connectionString}`);
});
