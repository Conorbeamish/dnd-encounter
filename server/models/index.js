const mongoose = require("mongoose");
mongoose.set("debug", false);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dnd-encounter", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("connected to DB"))
.catch(err => console.log(err));

module.exports.User = require("./user");
module.exports.Encounter = require("./encounter");
module.exports.Monster = require("./monster");
module.exports.Weapon = require("./weapon");
module.exports.MagicItem = require("./magicItem");