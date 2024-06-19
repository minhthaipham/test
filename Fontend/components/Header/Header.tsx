import React from "react";
import { styled, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import InputSearch from "../InputSearch/InputSearch";
import InforUser from "../InforUser/InforUser";
import { Home } from "@mui/icons-material";
const ThemeToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-white text-black sticky top-0 left-0 right-0 z-50 h-16">
        <ThemeToolBar className="flex items-center justify-between">
          <div className="hidden md:block">
            <Typography variant="h6">
              <Link className="text-[#1877F2]" href="/">
                Social Network
              </Link>
            </Typography>
          </div>
          <div
            className="block md:hidden
            text-[#1877F2]
          "
          >
            <Link href="/">
              <Home />
            </Link>
          </div>

          <InputSearch />
          <InforUser />
        </ThemeToolBar>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Header;
