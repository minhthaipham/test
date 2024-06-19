import React from "react";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { IUser } from "@/model/user";
import { searchInforUserChat } from "@/api/chat";
import { useAuth } from "@/context/AuthContext";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import { createGroupRequest, createGroupSuccess } from "@/redux/chat/action";
import { useSocket } from "@/context/SocketContext";
import { inforChat } from "@/redux/chat/selectors";
interface PopupGroupProps {
  open: boolean;
  handleClose: () => void;
}
const PopupGroup: React.FC<PopupGroupProps> = ({ open, handleClose }) => {
  const [chatName, setChatName] = React.useState("");
  const [members, setMembers] = React.useState<IUser[]>([]);
  const [image, setImage] = React.useState<File | null>(null);
  const [timeOut, setTimeOut] = React.useState<NodeJS.Timeout | null>(null);
  const [listUser, setListUser] = React.useState<IUser[]>([]);
  const { user } = useAuth();
  const chatById = useSelector(inforChat);
  const socket = useSocket();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    setTimeOut(
      setTimeout(async () => {
        if (e.target.value === "") {
          setListUser([]);
        } else {
          try {
            const res = await searchInforUserChat(e.target.value, user._id);
            if (res.data) {
              setListUser(res.data);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }, 1000)
    );
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    const user = JSON.parse(name);
    const { _id, fullName, avatar } = user;

    if (checked) {
      setMembers((prev) => [...prev, user]);
    }
    if (!checked) {
      setMembers((prev) => prev.filter((s) => s._id !== _id));
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const handleSubmit = async () => {
    const id = members.map((member) => member._id);
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dzttbzvs7");
    formData.append("folder", "chat-app");
    fetch("https://api.cloudinary.com/v1_1/dzttbzvs7/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((dt) => {
        dispatch(
          createGroupRequest({
            id: id,
            image: dt.url.toString(),
            chatName,
          })
        );
        if (socket) {
          socket.emit("accessChat", chatById);
        }
        handleClose();
        setMembers([]);
        setChatName("");
        setListUser([]);
        setImage(null);
      });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="absolute 
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      w-[500px] bg-white  rounded-md shadow-24 p-4 
    "
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Create a new group
        </Typography>
        <div className="flex items-center mb-2">
          {members.map((member) => (
            <div
              className="flex items-center mx-2 bg-slate-200 p-2 rounded-lg min-w-[100px]"
              key={member?._id}
            >
              <div>
                <Avatar
                  src={member?.avatar}
                  alt={member?.fullName}
                  sx={{
                    width: 32,
                    height: 32,
                    marginRight: 1,
                  }}
                />
              </div>
              <div>
                <Typography>{member?.fullName}</Typography>
              </div>
              <div>
                <Close
                  fontSize="small"
                  sx={{
                    marginLeft: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMembers((prev) =>
                      prev.filter((s) => s._id !== member._id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <div className="relative">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-48 h-36 rounded-full object-cover"
              />
            ) : (
              <Avatar className="w-24 h-24 rounded-full">
                <CameraAltIcon />
              </Avatar>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="image"
              className="absolute top-0 left-0 w-full h-full opacity-0  cursor-pointer"
            />
          </div>

          <TextField
            label="Group name"
            variant="standard"
            fullWidth
            sx={{
              marginTop: 2,
              marginLeft: 2,
            }}
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
          />
        </div>
        <TextField
          label="Add members"
          variant="outlined"
          fullWidth
          sx={{
            marginTop: 2,
          }}
          onChange={handleChange}
        />

        <div className="flex flex-wrap  mt-2">
          <FormControl fullWidth>
            <FormGroup>
              {listUser.map((items, index) => {
                return (
                  <FormControlLabel
                    className="hover:bg-[#f3f5f6] cursor-pointer rounded-sm py-2 my-2 h-12"
                    key={index}
                    control={
                      <Checkbox
                        checked={members.some((s) => s._id === items._id)}
                        onChange={handleChangeCheckbox}
                        name={JSON.stringify(items)}
                      />
                    }
                    label={
                      <div className="flex items-center ">
                        <Avatar
                          // src="https://i.pinimg.com/564x/ab/bc/76/abbc76d6a519f10caf2ce9d67343133f.jpg "
                          src={items.avatar}
                          className="mr-2"
                        />

                        <Typography>{items.fullName}</Typography>
                      </div>
                    }
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
            }}
            onClick={handleSubmit}
          >
            Create group
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupGroup;
