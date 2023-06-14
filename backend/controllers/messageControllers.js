const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const CryptoJS = require("crypto-js");
const encryptionKey = "myEncryptionKey";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    // // Дешифруем содержимое сообщений перед отправкой клиенту
    // const decryptedMessages = messages.map((message) => {
    //   const decryptedContent = CryptoJS.AES.decrypt(
    //     message.content,
    //     encryptionKey
    //   ).toString(CryptoJS.enc.Utf8);
    //   return { ...message._doc, content: decryptedContent };
    // });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // Шифруем содержимое сообщения перед сохранением
  const encryptedContent = CryptoJS.AES.encrypt(
    content,
    encryptionKey
  ).toString();

  var newMessage = {
    sender: req.user._id,
    content: encryptedContent,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Дешифруем содержимое сообщения перед отправкой клиенту
    const decryptedContent = CryptoJS.AES.decrypt(
      message.content,
      encryptionKey
    ).toString(CryptoJS.enc.Utf8);
    message.content = decryptedContent;

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
