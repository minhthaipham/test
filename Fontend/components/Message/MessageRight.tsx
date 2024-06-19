import { IMess } from "@/interface/mess";
import { Avatar, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";
interface IMessageRight {
  key: string;
  item: IMess;
}
const MessageRight: React.FC<IMessageRight> = ({ key, item }) => {
  return (
    <div className="flex items-end justify-end py-3" key={key}>
      <div className="flex  max-w-[90%]">
        <div className="bg-cyan-100 p-2 rounded-lg mr-2">
          {item?.type === "text" ? (
            <p className="text-black text-lg">{item.content}</p>
          ) : (
            <img
              src={item.content}
              alt="image"
              className="w-40 h-40 object-cover"
            />
          )}
          <p className="text-black text-right text-sm">
            {moment(item.createdAt).format("hh:mm ")}
          </p>
        </div>
        <Tooltip
          title={item?.users?.fullName}
          placement="top"
          className="cursor-pointer"
        >
          <Avatar src={item?.users?.avatar} />
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageRight;
