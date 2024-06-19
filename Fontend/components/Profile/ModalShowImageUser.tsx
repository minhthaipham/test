import React from "react";
import { Modal } from "@mui/material";
interface IModalShowImageUser {
  open: boolean;
  handleClose: () => void;
  image: string;
}
const ModalShowImageUser: React.FC<IModalShowImageUser> = ({
  open,
  handleClose,
  image,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white dark:bg-gray-900 rounded-[10px]">
        <img
          src={image}
          alt="avatar"
          className="w-full h-full object-cover rounded-[10px] "
        />
      </div>
    </Modal>
  );
};

export default ModalShowImageUser;
