/* 
module.exports = {
    Item: require("./item"),
    Person: require("./person")
}; */

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
/* mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true
}); */

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tradingpost", { useNewUrlParser: true,  keepAlive: true, useFindAndModify: false });

module.exports.Person = require("./person");
module.exports.Item = require("./item");
