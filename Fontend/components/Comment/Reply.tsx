import { IReply } from "@/interface/commment";
import React, { FC } from "react";
import moment from "moment";
import { Avatar } from "@mui/material";
interface ReplyProps {
  comment: IReply[];
}
const Reply: FC<ReplyProps> = ({ comment }) => {
  return (
    <>
      {comment.map((reply) => (
        <div className="flex items-start space-x-2" key={reply._id}>
          <Avatar
            src={reply.creator.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{reply.creator.fullName}</span>
            <span className="text-base">{reply.content}</span>
            <div className="ml-4 space-x-2">
              <span className="text-sm"> Like </span>
              <span className="font-medium text-sm cursor-pointer">Reply</span>
              <span className="text-sm text-gray-400">
                {moment(reply.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Reply;
