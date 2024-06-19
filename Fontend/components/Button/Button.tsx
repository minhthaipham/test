import React, { FC } from "react";
import { Button as ButtonMaterial } from "@mui/material";
import { IButtonProps } from "./type";
const Button: FC<IButtonProps> = (props) => {
  const { title, disabled, variant, className, type } = props;
  return (
    <ButtonMaterial
      disabled={disabled}
      variant={variant}
      className={className}
      fullWidth
      type={type}
    >
      {title}
    </ButtonMaterial>
  );
};

export default Button;
