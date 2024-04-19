import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import DropdownAvatar from "./DropdownAvatar";
import { useAuth } from "../store/hooks";
import axios from "axios";
import { DrawerAppBarProps, itemType } from "../types/appbar_types";
import { SideDrawer } from "./ui/appbarStyles";
import { CostumeButton } from "./ui/Button";

const drawerWidth = 240;

export default function DrawerAppBar(props: DrawerAppBarProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    image: "",
  });
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const auth = useAuth();
  React.useEffect(() => {}, [auth]);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <CssBaseline />
      <AppBar component="nav" sx={{ boxShadow: " 0 0 0.2rem  #ccc" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row ",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none", color: "#000" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* top bar  */}

          <Typography variant="h6" sx={{ my: 2, color: "#000" }}>
            SSA
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {!auth
              ? props?.navItems.map((item, i) => (
                  <NavLinks key={i} title={item.title} href={item.href} />
                ))
              : props?.defaultNavItem.map((item, i) => (
                  <NavLinks key={i} title={item.title} href={item.href} />
                ))}
          </Box>
          {/* Avatar */}
          {auth && (
            <div className="flex items-center justify-between gap-x-5">
              <DropdownAvatar
                image={user.image}
                dropDownItems={props.dropDownItems}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer
            navItems={props.navItems}
            defaultNavItem={props.defaultNavItem}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      </nav>
    </>
  );
}

const NavLinks = ({ title, href }: itemType) => {
  return (
    <>
      <Link to={href}>
        <CostumeButton sx={{ color: "black", textTransform: "capitalize" }}>
          {title}
        </CostumeButton>
      </Link>
    </>
  );
};
