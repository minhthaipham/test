import React from "react";
import { Add } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import ModalCreatePost from "./ModalCreatePost";
const ButtonCreatePost = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title="Add post"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
        }}
      >
        <Fab className=" bg-[#1877F2]" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <ModalCreatePost open={open} onClose={handleClose} />
    </>
  );
};

export default ButtonCreatePost;
