const express       = require("express"),
      bodyParser    = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
});