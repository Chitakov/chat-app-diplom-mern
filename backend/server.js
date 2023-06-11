const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const colors = require("colors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

console.log(process.env.REACT_APP_PORT);
console.log(process.env.REACT_APP_MONGO_URI);
console.log(process.env.REACT_APP_JWT_SECRET);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.REACT_APP_PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`.yellow.bold));
