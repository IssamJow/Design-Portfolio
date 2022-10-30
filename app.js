const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const allowList = ["http://localhost:8080", "http://localhost:8081"];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    //console.log("allowed ORIGIN: ", req.header("Origin"), req.path);
    corsOptions = {
      origin: true,
      credentials: true,
      methods: "GET,POST,PUT,",
      allowedHeaders: "Content-Type,Authorization",
      exposedHeaders: ["set-cookie"],
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    console.log("Not allowed ORIGIN: ", req.header("Origin"));
    corsOptions = {
      origin: false,
    }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors(corsOptionsDelegate));

app.listen(process.env.DEV_SERVER_PORT, () => {
  console.log("App Listing on Port 3000");
});
