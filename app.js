var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var session = require("express-session");
var sessionauth = require("./middlewares/sessionauth");

var app = express();
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// view engine setup
app.use(
  session({
    secret: "dummytext",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(sessionauth);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const db =
  "mongodb+srv://usama:000@cluster0.teqzo.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 0,
  })
  .then(() => {
    // winston.info(`Connected to ${db}...`);
    console.clear();
    console.log(`Connected to db...`);
    // testCalculation();
    // require("./models/addDummyData")();
  });
module.exports = app;
