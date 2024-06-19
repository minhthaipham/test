import React, { FC } from "react";
import {
  Modal,
  styled,
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ThumbUpAltOutlined,
  Favorite,
  SentimentDissatisfied,
  TagFaces,
  Image,
} from "@mui/icons-material";
import { IModalCreatePost } from "./type";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createPost, editPost } from "@/api/postApi";
import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getPostByIdUserRequest, getPostRequest } from "@/redux/post/actions";
import { choosePost } from "@/redux/post/selectors";
import { useRouter } from "next/router";
import { useSocket } from "@/context/SocketContext";
const ModalCreatePostMui = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const ModalCreatePost: FC<IModalCreatePost> = ({ open, onClose }) => {
  const socket = useSocket();
  const chosePost = useSelector(choosePost);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [inputValue, setInputValue] = React.useState("");
  const [image, setImage] = React.useState<any>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (router.pathname !== "/profile/[id]") {
        const res = await createPost(inputValue, image, user?._id);
        if (res.status === 200) {
          if (res.data.status) {
            dispatch(getPostRequest());
            socket?.emit("createPost", res.data.data);
            window.scrollTo({ top: 0, behavior: "smooth" });
            toast("Create post success");
            onClose();
            setInputValue("");
            setImage(null);
          }
        }
      } else {
        const res = await editPost(
          inputValue,
          image,
          chosePost.idPost,
          user?._id
        );
        if (res.status === 200) {
          if (res.data.status) {
            dispatch(
              getPostByIdUserRequest({
                id: user?._id,
              })
            );
            toast("Edit post success");
            onClose();
            setInputValue("");
            setImage(null);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e: any) => {
    const type = e.target.files[0].type;
    if (type === "image/png" || type === "image/jpeg" || type === "image/jpg") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("File không đúng định dạng");
    }
  };

  React.useEffect(() => {
    if (router.pathname === "/profile/[id]") {
      setInputValue(chosePost.content);
      setImage(chosePost.image);
    }
  }, [chosePost, router.pathname]);
  return (
    <ModalCreatePostMui
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={5}
          className="min-h-min"
          width={400}
          p={2}
          bgcolor={"background.default"}
          color="text.primary"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            {router.pathname === "/profile/[id]" ? "Edit Post" : "Create Post"}
          </Typography>
          <TextField
            id="standard-basic"
            placeholder="What's on your mind?"
            variant="standard"
            fullWidth
            multiline
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {image && (
            <div className="flex items-center justify-center mt-3">
              <img src={image} alt="image" className="w-1/2  object-cover " />
            </div>
          )}
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <Tooltip title="Image">
                <label htmlFor="image">
                  <IconButton component="span">
                    <Image color="info" />
                  </IconButton>
                </label>
              </Tooltip>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <IconButton>
              <ThumbUpAltOutlined color="primary" />
            </IconButton>
            <IconButton>
              <Favorite className="text-red-500" />
            </IconButton>
            <IconButton>
              <SentimentDissatisfied className="text-[#FFE15D]" />
            </IconButton>
            <IconButton>
              <TagFaces className="text-[#F49D1A]" />
            </IconButton>
          </div>
          <div className="text-center">
            <Button
              variant="contained"
              title="Post"
              className={`w-3/5 bg-[#1877F2] text-white `}
              type="submit"
            />
          </div>
        </Box>
      </form>
    </ModalCreatePostMui>
  );
};

export default ModalCreatePost;
