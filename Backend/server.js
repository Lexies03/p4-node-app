const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.router");
const groceryRouter = require("./src/routes/grocery.router");
const budgetRouter = require("./src/routes/budget.router");

const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

//models
const UserModel = require("./src/models/user.entity");

//objects
const User = require("./src/objects/user.object");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    throw new Error("Failed to connect with the database", err);
  });
app.use((req, res, next) => {
  console.log(`${req.method} for ${req.url}`);
  next();
});
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
});

app.use("/grocery", groceryRouter);
app.use("/budget", budgetRouter);

app.listen(PORT, () => {
  console.log(`Sever is running at port ${PORT}`);
});
