const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://zkart-nvxw.vercel.app',
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname,"./uploads")));
app.use("/test", (req, res)=>{
  res.send("Hello World!!!")
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}




// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
