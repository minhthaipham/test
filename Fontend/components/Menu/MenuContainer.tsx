import React, { FC } from "react";
import { Menu } from "@mui/material";
type Props = {
  children: React.ReactNode;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
};
const MenuContainer: FC<Props> = ({
  children,
  anchorEl,
  open,
  handleClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {children}
    </Menu>
  );
};

export default MenuContainer;
