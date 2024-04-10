import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export interface DropdownAvatarProps {
  dropDownItems: { title: string; href: string }[];
  run: boolean;
  image?: string;
}
export default function DropdownAvatar({
  dropDownItems,
  run,
  image,
}: DropdownAvatarProps) {
  React.useEffect(() => {}, [run]);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {image ? (
          <Avatar sx={{ width: 28, height: 28 }} src={image} />
        ) : (
          <Avatar
            sx={{
              backgroundColor: "transparent",
              color: "#000",
              border: ".1rem solid #ccc",
              width: 28,
              height: 28,
            }}
          >
            A
          </Avatar>
        )}
      </IconButton>
      {dropDownItems.length !== 0 && (
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {dropDownItems?.map((s, i) => (
            <MenuItem key={i} onClick={handleCloseUserMenu}>
              <Link to={s.href}>
                <Typography textAlign="center">{s.title}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}
