const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dnd-encounter", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("connected to DB"))
.catch(err => console.log(err));