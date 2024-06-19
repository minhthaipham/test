import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home,
  Article,
  Group,
  Storefront,
  PersonAdd,
  Settings,
  AccountBox,
  Nightlight,
} from "@mui/icons-material";
import { dataSidebar } from "@/data/sidebar";
const SideBar = () => {
  return (
    <div className="flex-1 p-2 hidden lg:block">
      <Box position="fixed">
        <List>
          {dataSidebar.map((item, index) => (
            <div key={index}>
              <ListItemButton>
                <ListItemIcon className="text-[#1877F2]">
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  className="hidden  md:block font-semibold"
                />
              </ListItemButton>
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default SideBar;
