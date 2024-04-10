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
  settings: { title: string; href: string }[];
  run: boolean;
  auth?: boolean;
  image?: string;
}
export default function DropdownAvatar({
  settings,
  run,
  auth,
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
    <Box sx={{ flexGrow: 0 ,mx:"auto"}}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {image ? <Avatar src={image} /> : <Avatar>A</Avatar>}
      </IconButton>

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
        {settings?.map((s, i) => (
          <MenuItem key={i} onClick={handleCloseUserMenu}>
            <Link to={s.href}>
              <Typography textAlign="center">{s.title}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
