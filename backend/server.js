const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const colors = require("colors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
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

// если удалить, то будет ошибка, т.к. не будет существовать страницы, а оно перенаправляет на /chats
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.REACT_APP_PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`.yellow.bold));
