import { IChat } from "@/interface/chat";
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
import { searchAddMember } from "@/api/chat";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { addMembersRequest } from "@/redux/chat/action";
interface AddMembersGroupModalProps {
  open: boolean;
  handleClose: () => void;
  chat: IChat;
}
const AddMembersGroupModal: React.FC<AddMembersGroupModalProps> = ({
  open,
  handleClose,
  chat,
}) => {
  const [members, setMembers] = React.useState<IUser[]>([]);
  const [listUser, setListUser] = React.useState<IUser[]>([]);
  const [timeOut, setTimeOut] = React.useState<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
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
            const res = await searchAddMember(chat._id, e.target.value);
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
  const handleAddMembers = async () => {
    const id = members.map((member) => member._id);
    dispatch(
      addMembersRequest({
        chatId: chat._id,
        userId: id,
      })
    );
    handleClose();
    setListUser([]);
    setMembers([]);
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
        <Avatar
          src={chat?.image || ""}
          alt={chat?.chatName || ""}
          sx={{
            width: 120,
            height: 120,
            margin: "10px auto",
          }}
        />
        <div className="flex items-center">
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
                        // checked={members.includes(items._id)}
                        checked={members.some((s) => s._id === items._id)}
                        onChange={handleChangeCheckbox}
                        // name={name}
                        // name={items._id}
                        //get all value in object
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
        <div className="flex items-center justify-between">
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
            }}
            onClick={handleAddMembers}
          >
            Add members
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMembersGroupModal;
