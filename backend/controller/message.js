import Message from "../model/message.js";
import Chat from "../model/chat.js";
import User from "../model/user.js";
export const sendMessage = async (req, res) => {
  const { idChat, content, idUser, type } = req.body;
  // console.log("image", image);
  try {
    const message = new Message({
      chat: idChat,
      content,
      users: idUser,
      type,
      // image,
    });
    await message.save();
    await Chat.findByIdAndUpdate(
      idChat,
      {
        latestMessage: message,
      },
      { new: true }
    );

    const newMessage = await Message.findOne({
      _id: message._id,
    }).populate("users", "-password");
    // .populate("chat");
    res.status(200).json({
      status: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(409).json({
      status: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.find({ chat: id }).populate(
      "users",
      "-password"
    );
    res.status(200).json({
      status: true,
      data: messages,
    });
  } catch (error) {
    res.status(409).json({
      status: false,
      message: error.message,
    });
  }
};
