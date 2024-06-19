import SideBarChat from "@/components/SideBarChat";
import React from "react";
import Test from "./test";
import { useSelector } from "react-redux";
import { checkChat, idChat } from "@/redux/chat/selectors";
import ChatScreen from "@/components/Chat";
const Chat = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const check = useSelector(checkChat);
  const id = useSelector(idChat);

  const handleClick = () => {};

  return (
    <div className="bg-red-500  " style={{ height: "calc(100vh - 4rem)" }}>
      <div className="grid grid-cols-4  h-full">
        <div className="hidden md:block col-span-1  bg-blue-400">
          <SideBarChat />
        </div>
        <div className="col-span-4 md:col-span-3 bg-white">
          {check ? (
            <ChatScreen idChat={id} />
          ) : (
            <div
              className="flex items-center justify-center "
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <Test />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
