require("dotenv").config();

const express                       = require("express"),
      bodyParser                    = require("body-parser"),
      cors                          = require("cors"),
      errorHandler                  = require("./handlers/error"),
      authRoutes                    = require("./routes/auth"),
      encountersRoutes              = require("./routes/encounters"),
      monstersRoutes                = require("./routes/monsters"),
      {loginRequired, correctUser}  = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//Auth Routes
app.use("/api/auth", authRoutes);

//Encounters Routes
app.use(
    "/api/users/:id/encounters", 
    loginRequired,
    correctUser,
    encountersRoutes
);

//Monsters Routes
app.use(
    "/api/users/:id/encounters/:encounter_id",
    loginRequired,
    correctUser,
    monstersRoutes
)

app.use((req, res, next) => {
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
});

//Responds to all errors
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on: ${port}`);
});