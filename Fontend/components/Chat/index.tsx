import { getMessages, sendMessage } from "@/api/message";
import { useAuth } from "@/context/AuthContext";
import { IMess } from "@/interface/mess";
import { inforChat, inforUserAdded } from "@/redux/chat/selectors";
import {
  ArrowBack,
  AttachFile,
  InsertEmoticon,
  Send,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MessageRight from "../Message/MessageRight";
import MessageLeft from "../Message/MessageLeft";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { backChat } from "@/redux/chat/action";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { PhoneInTalkOutlined } from "@mui/icons-material";
import ChatGroupMenu from "../Group/ChatGroupMenu";
import { useSocket } from "@/context/SocketContext";
import IconTyping from "./IconTyping";
interface IChatScreen {
  idChat: string;
}
const ChatScreen: React.FC<IChatScreen> = ({ idChat }) => {
  const iChat = useSelector(inforChat);
  const infor = useSelector(inforUserAdded);
  const [dataChat, setDataChat] = React.useState<IMess[]>([]);
  const [textMessage, setTextMessage] = React.useState<string>("");
  const [showIcon, setShowIcon] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<File | null>(null);
  console.log("image", image);
  const [typing, setTyping] = React.useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = React.useState<any>(null);
  const { user } = useAuth();
  const socket = useSocket();
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleBack = () => {
    dispatch(backChat());
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMessages(idChat);
        if (res.status && socket) {
          setDataChat(res.data);
          socket.emit("join", idChat);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idChat]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value);
    if (socket) {
      socket.emit("typing-start", idChat);

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(
        setTimeout(() => {
          socket.emit("typing-end", idChat);
        }, 1000)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textMessage === "") {
      return;
    }
    try {
      const res = await sendMessage(idChat, textMessage, user._id, "text");
      if (res.status && socket) {
        setDataChat([...dataChat, res.data]);
        setTextMessage("");
        socket.emit("sendMessage", { data: res.data, idChat });
      }
      // check if the message is a text or an image
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (dataChat) => {
        if (dataChat?.chat === idChat) {
          setDataChat((prev) => [...prev, dataChat]);
        }
      });
    }
  }, [idChat, socket]);

  const handleSubmitImage = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image as Blob);
        formData.append("upload_preset", "chat-app");
        formData.append("cloud_name", "dzttbzvs7");
        formData.append("folder", "chat-app");

        // Gửi yêu cầu tải lên ảnh
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzttbzvs7/image/upload",
          {
            method: "post",
            body: formData,
          }
        );

        if (response.ok) {
          const dt = await response.json();
          const res = await sendMessage(
            idChat,
            dt.url.toString(),
            user._id,
            "image"
          );
          console.log("res", res);
          if (res.status && socket) {
            setDataChat([...dataChat, res.data]);
            setTextMessage("");
            setImage(null);
            socket.emit("sendMessage", { data: res.data, idChat });
          }
        } else {
          console.error("Error uploading image:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected!");
    }
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files = e.target.files;
    // if (files && files.length > 0) {
    //   setImage(files[0]);
    //   // submitForm();
    //   handleSubmitImage();
    // }
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  React.useEffect(() => {
    // Sử dụng useEffect để gọi handleSubmitImage khi giá trị của image thay đổi
    if (image !== null) {
      handleSubmitImage();
    }
  }, [image]);
  // const submitForm = () => {
  //   if (formRef.current) {
  //     formRef.current.submit();
  //   }
  // };
  // const handleShowIcon = () => {};
  // const onEmojiClick = (event: any, emojiObject: any) => {};
  const handleShowIcon = () => {
    setShowIcon(!showIcon);
  };
  const onEmojiClick = (event: any, emojiObject: any) => {
    setTextMessage(textMessage + event.emoji);
  };
  React.useEffect(() => {
    if (socket) {
      socket.on("typing-start-server", () => {
        setTyping(true);
      });
      socket.on("typing-end-server", () => {
        setTyping(false);
      });
    }
  }, [socket]);
  return (
    <div className="" style={{ height: "calc(100vh - 4rem)" }}>
      <div className="bg-slate-50 shadow-sm h-[70px]">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center ">
            <div className="pr-2 cursor-pointer" onClick={handleBack}>
              <ArrowBack />
            </div>
            <Avatar
              src={
                iChat?.chatName
                  ? iChat?.image || ""
                  : iChat?.users.find((item) => item._id !== user._id)?.avatar
              }
              className="cursor-pointer ml-2"
            />

            <h1 className="text-bold text-2xl  ml-2">
              {iChat?.chatName
                ? iChat?.chatName
                : iChat?.users.find((item) => item._id !== user._id)?.fullName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <PhoneInTalkOutlined
                className="text-neutral-600"
                fontSize="large"
              />
            </div>
            <div>
              <VideoCallOutlinedIcon
                className="text-neutral-600"
                fontSize="large"
              />
            </div>
            <div>{iChat?.isGroupChat && <ChatGroupMenu />}</div>
            {/* <div>{chats?.isGroupChat && <ChatGroupMenu />}</div> */}
          </div>
        </div>
      </div>
      <div className="bg-blue-900 h-[calc(100%-70px-38px)] ">
        <div className="h-full overflow-y-auto bg-slate-300 flex flex-col-reverse">
          <div className="absolute ml-4"></div>
          {typing && (
            <div className="flex items-center">
              <div>
                <p className="text-white text-lg font-bold">
                  {iChat?.users.find((item) => item._id !== user._id)?.fullName}
                </p>
              </div>
              <div>
                <IconTyping />
              </div>
            </div>
          )}
          <div className="w-full p-6">
            {dataChat?.map((item) => {
              if (item?.users?._id === user._id) {
                return <MessageRight key={item._id} item={item} />;
              } else {
                return <MessageLeft key={item._id} item={item} />;
              }
            })}
            {/* <div className=" flex items-center justify-center gap-1 bg-white px-5 py-3 rounded-3xl w-fit m-auto">
              {infor?.fullName === user?.fullName ? (
                <>
                  <p>You added to the group</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold">{user.fullName}</p>
                  <p>added</p>
                  <p className="text-lg font-bold">{infor.fullName}</p>
                  <Avatar
                    src={infor.avatar}
                    sx={{
                      width: 32,
                      height: 32,
                    }}
                  />
                  <p>to the group</p>
                </>
              )}
            </div> */}
          </div>
        </div>

        <div className="absolute bottom-10 ml-4"></div>
      </div>
      <div className="h-[30px] w-full flex items-center  ">
        <div className="w-full relative">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-full rounded-md p-3 focus:outline-none"
              placeholder="Type a message"
              value={textMessage}
              onChange={handleChange}
              ref={inputRef}
            />
            <div className="absolute right-0 top-[50%] transform -translate-y-1/2 cursor-pointer flex items-center h-full">
              <InsertEmoticon
                className=" rounded-md text-black mr-3"
                onClick={handleShowIcon}
              />
              {showIcon && (
                <div className="absolute bottom-[70%] right-[100%]">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="
                absolute top-0 left-0 w-[1.3rem] h-full  cursor-pointer opacity-0
                  "
                  name="image"
                  onChange={handleUpload}
                />
                <AttachFile className="rounded-md text-black mr-3 w-[1rem]" />
              </div>
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                // fullWidth
                sx={{
                  height: "100%",
                }}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
