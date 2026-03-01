var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.config");
const session = require("express-session");

const { connectToMongoDB } = require("./config/mongo.connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.routes");
var productRouter = require("./routes/product.routes");

require("dotenv").config();

var app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.netsecret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/api/products", productRouter);

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
  res.json("error");
});

const server = http.createServer(app);
server.listen(process.env.Port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${process.env.Port}`);
});
