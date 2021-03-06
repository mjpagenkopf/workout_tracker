const express = require("express");
const logger = require("morgan");
// const mongoose = require("mongoose");
const db = require('./config/connection');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(require('./routes'))//this only works if there is an index.js to read. 
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db", { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false 
// }
// );

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});