import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { authRunAtom } from "../store/atom";
export interface DropdownAvatarProps {
  dropDownItems: { title: string; href: string }[];
  image?: string;
}


export default function DropdownAvatar({
  dropDownItems,
  image,
}: DropdownAvatarProps) {
  const [authRun, setAuthRun] = useRecoilState(authRunAtom);
  const navigate = useNavigate();
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
          <MenuItem
            onClick={async () => {
              try {
                await signOut(auth);
              } catch (error) {
                console.log(error);
                toast.error("Error in Sign Out");
              }
              toast.success("Sign Out Successfully");
              localStorage.removeItem("userType");
              localStorage.removeItem("authorization");
              localStorage.removeItem("id");
              navigate("/");
              setAuthRun(!authRun);
              return;
            }}
          >
            <Typography textAlign="center">Sign Out</Typography>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}
