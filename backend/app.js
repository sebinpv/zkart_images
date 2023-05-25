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

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const category = require("./controller/category");
const brand = require("./controller/brand");
const tags = require("./controller/tags");
const blogcategory = require("./controller/blogcategory");
const blog = require("./controller/blog");
const enquiry = require("./controller/enquiry");


app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/category", category);
app.use("/api/v2/brand", brand);
app.use("/api/v2/tags", tags);
app.use("/api/v2/blogcategory", blogcategory);
app.use("/api/v2/blog", blog);
app.use("/api/v2/enquiry", enquiry);




// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
