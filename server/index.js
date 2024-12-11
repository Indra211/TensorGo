const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/DB");
const { AccessLogger } = require("./middlewares/accessLogger");
const { errorLogger } = require("./middlewares/errorLogger");
const { userRouter } = require("./controllers/users");
const { requestRouter } = require("./controllers/requests");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to MongoDB
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

//Route Logger
app.use(AccessLogger);

//Routes
const apiPath = "/api/v1";
app.use(`${apiPath}/user`, userRouter);
app.use(`${apiPath}/requests`, requestRouter);

// Error Logger
app.use(errorLogger);

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
