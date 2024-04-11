import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DropdownAvatar from "./DropdownAvatar";
import { useAuth } from "../store/hooks";
import axios from "axios";

interface Props {
  navItems: { title: string; href: string }[];
  dropDownItems: { title: string; href: string }[];
  defaultNavItem: { title: string; href: string }[];
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
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
  const getUser = async () => {
    if (localStorage.getItem("userType")) {
      const id = localStorage.getItem("id");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${localStorage.getItem("userType")?.toLowerCase() == "student" ? "user" : "admin"}/user/${id}`,
        );
        if (res.data) {
          const r = res.data.data;
          return setUser({
            email: r.email,
            name: r.name,
            image: r.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return setUser({ email: "", name: "", image: "" });
    }
  };
  React.useEffect(() => {
    getUser();
  }, [auth]);
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {!auth
          ? props.navItems?.map((item, i) => (
              <ListItem key={i} disablePadding>
                <Link to={item.href}>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          : props.defaultNavItem?.map((item, i) => (
              <ListItem key={i} disablePadding>
                <Link to={item.href}>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
      </List>
    </Box>
  );

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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {!auth
              ? props?.navItems.map((item, i) => (
                  <Link key={i} to={item.href}>
                    <Button
                      sx={{ color: "black", textTransform: "capitalize" }}
                    >
                      {item.title}
                    </Button>
                  </Link>
                ))
              : props?.defaultNavItem.map((item, i) => (
                  <Link key={i} to={item.href}>
                    <Button
                      sx={{ color: "black", textTransform: "capitalize" }}
                    >
                      {item.title}
                    </Button>
                  </Link>
                ))}
          </Box>{" "}
          {auth && (
            <DropdownAvatar
              image={user.image}
              dropDownItems={props.dropDownItems}
            />
          )}
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
