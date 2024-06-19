import { IChat } from "@/interface/chat";
import React from "react";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { renameChatRequest } from "@/redux/chat/action";
interface RenameGroupModalProps {
  open: boolean;
  handleClose: () => void;
  chat: IChat;
}
const RenameGroupModal: React.FC<RenameGroupModalProps> = ({
  open,
  handleClose,
  chat,
}) => {
  const [chatName, setChatName] = React.useState(chat?.chatName || "");
  // const [img, setImg] = React.useState(chat?.image || "");
  const [image, setImage] = React.useState<File | null>(null);
  const dispatch = useDispatch();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const handleClick = () => {
    // dispatch(renameChatRequest({ chatId: chat._id, chatName, image: img }));
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
          renameChatRequest({
            chatId: chat._id,
            chatName,
            image: dt?.url?.toString(),
          })
        );
      });

    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h4 className="text-lg font-semibold mb-4">Rename group</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <div className="border-b-2 border-gray-300 "></div>
              <div className="flex items-center justify-center mt-3">
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <Avatar
                    src={image ? URL.createObjectURL(image) : chat.image || ""}
                    sx={{
                      width: 200,
                      height: 200,
                      mb: 2,
                    }}
                  />
                </label>
              </div>
              <p className=" text-gray-500">
                This will change the name of the group for everyone in the
                group.
              </p>
              <TextField
                id="outlined-basic"
                // label="Group name"
                variant="outlined"
                sx={{ width: "100%", mt: 2 }}
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
          <button
            className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-200"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className=" mr-[15px] p-3 border-2 border-sky-400 bg-sky-600 rounded-lg 
          text-white hover:bg-sky-500
          "
            onClick={handleClick}
          >
            Rename
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RenameGroupModal;
