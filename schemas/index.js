const mongoose = require("mongoose");

require('dotenv').config();

const connect = () => {
    mongoose
    .connect(process.env.MONGO_LOCAL_URL, {
        useNewUrlParser: true,
        ignoreUndefined: true,
        //user: process.env.DBUSER,
        //pass: process.env.DBPASS
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;