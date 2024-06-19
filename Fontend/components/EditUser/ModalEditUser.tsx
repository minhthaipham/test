import { Avatar, Button, Modal } from "@mui/material";
import React from "react";
import { IEditUserProps } from "./type";
import { Box, TextField, TextareaAutosize } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "15px",
};
const ModalEditUser = ({ open, onClose, setProfile }: IEditUserProps) => {
  const { user, editUser } = useAuth();
  const [data, setData] = React.useState({
    fullName: "",
    mobile: "",
    address: "",
    story: "",
    website: "",
    avatar: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editUser(
      data.avatar,
      data.fullName,
      data.mobile,
      data.address,
      data.story,
      data.website,
      user._id
    );
    setProfile({
      ...user,
      avatar: data.avatar,
      fullName: data.fullName,
      mobile: data.mobile,
      address: data.address,
      story: data.story,
      website: data.website,
    });

    onClose();
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setData({ ...data, avatar: reader.result as string });
      };
    }
  };

  React.useEffect(() => {
    if (user) {
      setData({
        fullName: user.fullName,
        mobile: user.mobile,
        address: user.address,
        story: user.story,
        website: user.website,
        avatar: user.avatar,
      });
    }
  }, [user]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Avatar
            alt="Remy Sharp"
            src={data.avatar}
            sx={{
              width: "100px",
              height: "100px",
              margin: "0 auto",
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="border-2 border-gray-300 rounded-lg w-full p-2 hover:border-gray-400 focus:outline-none focus:border-gray-400"
          />
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            type="text"
            name="mobile"
            value={data.mobile}
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            type="text"
            name="address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Tell us about yourself"
            name="story"
            value={data.story}
            onChange={(e) => setData({ ...data, story: e.target.value })}
            className="border-2 border-gray-300 rounded-lg w-full p-2 hover:border-gray-400 focus:outline-none focus:border-gray-400"
          />
          <TextField
            label="Website"
            variant="outlined"
            fullWidth
            type="text"
            name="website"
            value={data.website}
            onChange={(e) => setData({ ...data, website: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              margin: "30px 0",
              bgcolor: "#002D74",
              padding: "10px 0",
              borderRadius: "15px",
              color: "#fff",
            }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEditUser;
