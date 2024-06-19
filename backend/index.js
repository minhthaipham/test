import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./router/auth.js";
import user from "./router/user.js";
import post from "./router/posts.js";
import comment from "./router/comment.js";
import chat from "./router/chat.js";
import message from "./router/message.js";
import test from "./router/test.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 5000;

const URL =
  "mongodb+srv://minhthai:thanhhoainun1@mern.kcqtexp.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    // origin: "https://social-network-ebon-alpha.vercel.app/",
    origin: "*",
    credentials: true,
  })
);

app.use("/auth", auth);
app.use("/auth", user);
app.use("/post", post);
app.use("/comment", comment);
app.use("/test", test);
app.use("/chat", chat);
app.use("/message", message);
// socket
let users = [];
let posts = [];
io.on("connection", (socket) => {
  socket.on("online", (userId) => {
    if (users.find((user) => user.userId === userId)) {
      users = users.map((user) =>
        user.userId === userId ? { userId, socketId: socket.id } : user
      );
    } else {
      users.push({
        userId: userId,
        socketId: socket.id,
      });
    }
    io.emit(
      "getUsers",
      users.map((user) => user.userId)
    );
  });
  // create post
  socket.on("createPost", (post) => {
    io.emit("getPosts", post);
  });

  socket.on("join", (idPost) => {
    socket.join(idPost);
  });
  //like post
  socket.on("likePost", ({ post, idPost }) => {
    socket.broadcast.emit("notify", post);
    io.emit("receiveLike", post);
  });

  // comment

  socket.on("comment", ({ comment, idPost }) => {
    io.emit("receiveComment", comment, idPost);
  });
  // socket.on("join", (idChat) => {
  //   console.log("idChat", idChat);
  //   socket.join(idChat);
  // });
  //typing
  // socket.on("typing-start", (idChat) => {
  //   console.log("start", idChat);
  //   // socket.broadcast.emit("typing-start-server");
  //   // socket.to(idChat).emit("typing-start-server");
  //   socket.to(idChat).emit("typing-start-server");
  // });

  // socket.on("typing-end", (idChat) => {
  //   console.log("end", idChat);
  //   // socket.broadcast.emit("typing-end-server");
  //   // socket.to(idChat).emit("typing-end-server");
  // });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
  // Handle other socket events as needed
});

//chat
io.on("connection", (socket) => {
  socket.on("join", (idChat) => {
    console.log("idChat", idChat);
    socket.join(idChat);
  });
  socket.on("accessChat", (chat) => {
    socket.broadcast.emit("accessChat", chat);
  });

  // socket.on("sendMessage", ({ data, idChat }) => {
  //   socket.broadcast.emit("notify", data);
  //   socket.to(idChat).emit("receiveMessage", data);
  // });

  // //group
  // socket.on("reNameGroup", (data) => {
  //   // socket.to(data.chatId).emit("reNameGroup", data.chatName);
  //   io.in(data.chatId).emit("reNameGroup", data.chatName);
  // });
  // socket.on("leaveRoom", (data) => {
  //   console.log("data", data);
  //   socket.leave(data.chatId);
  //   socket.to(data.chatId).emit("leaveRoom", data.nameUser);
  // });
  socket.on("sendMessage", ({ data, idChat }) => {
    socket.broadcast.emit("notify", data.content);
    socket.to(idChat).emit("receiveMessage", data);
  });
  socket.on("typing-start", (idChat) => {
    socket.to(idChat).emit("typing-start-server");
  });

  // socket.on("notify", ({ data, idChat }) => {
  //   socket.to(idChat).emit("notify", data);
  // });

  socket.on("typing-end", (idChat) => {
    socket.to(idChat).emit("typing-end-server");
  });
});

mongoose.set("strictQuery", false);
// mongoose
//   .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(port, () => console.log(`Server running on port: ${port}`));
//   })
//   .catch((error) => console.log(error.message));

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => console.log(error.message));
