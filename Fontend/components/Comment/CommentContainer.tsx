import React from "react";
import { MenuItem, ListItemIcon, Avatar } from "@mui/material";
import {
  ChatBubble,
  Share as ShareIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { choosePost } from "@/redux/post/selectors";
import { useAuth } from "@/context/AuthContext";
import { createComment } from "@/api/commentApi";
import Reply from "./Reply";
import Comment from "./Comment";
import { IComment } from "@/interface/commment";
import { usePostDispatch } from "@/libs/hook/usePost";
import { useSocket } from "@/context/SocketContext";
import { IPost } from "@/interface/post";

interface ICommentContainer {
  comment: IComment[];
}
const CommentContainer = ({ comment }: ICommentContainer) => {
  const socket = useSocket();
  const { user } = useAuth();
  const [showComment, setShowComment] = React.useState(false);
  const [showReply, setShowReply] = React.useState(false);
  const [content, setContent] = React.useState("");
  const post = useSelector(choosePost);
  const dispatchPostRequest = usePostDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (content === "") return;
    try {
      const res = await createComment(post.idPost, user?._id, content);
      if (res.status === 200) {
        dispatchPostRequest();
        socket?.emit("comment", {
          comment: res.data.data,
          idPost: post.idPost,
        });
        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center ">
        <MenuItem onClick={() => setShowComment(!showComment)}>
          <ListItemIcon>
            <ChatBubble />
          </ListItemIcon>
          <span>Comment</span>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <span>Share</span>
        </MenuItem>
      </div>
      {showComment && (
        <div className="w-full space-y-4 mb-4">
          {comment.map((comment, index) => (
            <Comment comment={comment} key={index} setShowReply={setShowReply}>
              {comment?.replies?.length > 0 && (
                <div
                  className="ml-4 flex items-center cursor-pointer"
                  onClick={() => setShowReply(!showReply)}
                >
                  <ReplyIcon className="text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {comment?.replies?.length} Reply
                  </span>
                </div>
              )}
              {showReply && <Reply comment={comment?.replies} />}
            </Comment>
          ))}

          <div className=" py-2 flex items-center space-x-3 ">
            <Avatar
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="w-full relative ">
              <form className="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="p-2 rounded-2xl w-full bg-[#F2F3F5] focus:outline-none "
                />

                <button
                  type="submit"
                  className="absolute top-[50%] right-0 translate-y-[-50%] mr-3"
                >
                  <SendIcon className="text-blue-500" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentContainer;
