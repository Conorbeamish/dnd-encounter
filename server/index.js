const express       = require("express"),
      bodyParser    = require("body-parser"),
      cors          = require("cors"),
      errorHandler  = require("./handlers/error");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on: ${port}`);
});