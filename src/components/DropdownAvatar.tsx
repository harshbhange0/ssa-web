import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { DropdownAvatarProps } from "../types/dropdownAvatar_types";
import { authAtom } from "../store/atom";
import { onAuthStateChanged } from "firebase/auth";
import authFirebase from "../firebase/firebase.config";

interface userType {
  email: string | undefined;
  image: string | undefined;
}
export default function DropdownAvatar({ dropDownItems }: DropdownAvatarProps) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [user, setUser] = useState<userType>({ email: "", image: "" });
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //@ts-expect-error
  const [authr, setAuthR] = useRecoilState(authAtom);
  useEffect(() => {
    if (localStorage.getItem("userType") == "student") {
      onAuthStateChanged(authFirebase, (user) => {
        if ((user?.email, user?.photoURL)) {
          setUser({ email: user?.email!, image: user?.photoURL });
        }
      });
    }
    setUser({ email: undefined, image: undefined });
  }, []);
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {user.email ? (
          <Avatar sx={{ width: 28, height: 28 }} src={user.image!} />
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
              localStorage.removeItem("Authorization");
              localStorage.removeItem("user");
              navigate("/");
              setAuthR(false);
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
