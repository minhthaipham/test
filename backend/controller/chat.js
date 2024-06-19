import Chat from "../model/chat.js";
import User from "../model/user.js";
export const accessChat = async (req, res) => {
  const { ida, idb, chatName } = req.body;
  const check = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: ida } } },
      { users: { $elemMatch: { $eq: idb } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("groupAdmin", "-password");

  if (check.length > 0) {
    res.status(200).json({
      status: true,
      data: check[0],
    });
  } else {
    try {
      const newChat = new Chat({
        users: [ida, idb],
        // chatName: "chatName",
        isGroupChat: false,
      });
      await newChat.save();
      const updateChat = await Chat.findOne({
        _id: newChat._id,
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("groupAdmin", "-password");
      res.status(200).json({
        status: true,
        data: updateChat,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
};

export const listChatOfUser = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.find({
      // users: { $elemMatch: { $eq: req.userId } },
      users: { $elemMatch: { $eq: id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getChat = async (req, res) => {
  // const data = req.body;
  // console.log(data);
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");
    res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    // const user = await User.find({
    //   _id: { $ne: req.userId },
    //   fullName: { $regex: req.query.fullName, $options: "i" },
    // });
    // res.status(200).json({
    //   status: true,
    //   data: user,
    // });
    res.status(200).json({
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
export const createGroupChat = async (req, res) => {
  try {
    const { id, image, chatName } = req.body;
    if (id.length < 2) {
      return res
        .status(400)
        .json({ message: "Please select at least 2 users" });
    }

    id.push(req.userId);
    const newChat = await Chat.create({
      users: id,
      // chatName: req.body.chatName,
      image,
      chatName,
      isGroupChat: true,
      groupAdmin: req.userId,
    });
    //   .populate("users", "-password")
    //   .populate("latestMessage");
    const updateChat = await Chat.findOne({
      _id: newChat._id,
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");
    res.status(200).json({
      status: true,
      data: updateChat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const reNameGroup = async (req, res) => {
  try {
    const { chatId, chatName, image } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      {
        _id: chatId,
      },
      { chatName: chatName, image: image },
      { new: true }
    )
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const searchAddMembers = async (req, res) => {
  const { chatId, fullName } = req.query;
  try {
    const chat = await Chat.findOne({
      _id: chatId,
    });
    const a = JSON.stringify(chat.users);
    const b = JSON.parse(a);
    const user = await User.find({
      _id: { $nin: b },
      fullName: { $regex: fullName, $options: "i" },
    });
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const addMember = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      {
        _id: chatId,
      },
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");
    res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { $pull: { users: req.userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const deleteGroup = async (req, res) => {
  const { chatId } = req.body;
  try {
    const check = await Chat.findById(chatId)
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");

    // if (check.groupAdmin._id.toString() === req.userId) {
    //   const chat = await Chat.findByIdAndDelete(chatId)
    //     .populate("users", "-password")
    //     .populate("latestMessage")
    //     .populate("groupAdmin", "-password");
    //   res.status(200).json({
    //     status: true,
    //     data: chat,
    //   });
    // } else {
    //   res.status(500).json({ message: "You are not the room owner " });
    // }
    // xóa lun chat và tin nhắn trong chat

    const chat = await Chat.findByIdAndDelete(chatId);
    res.status(200).json({
      status: true,
      message: "Delete group chat success",
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
