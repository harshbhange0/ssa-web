import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { DrawerHeader } from "./ui/SideBarStyles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

export default function SideBar() {
  const location = useLocation();
  const pageType = location.pathname.includes("dashboard")
    ? "dashboard"
    : "quiz";
  const type = localStorage.getItem("userType")?.toLocaleLowerCase();
  const sideBarItem: { title: string; href: string }[] = [
    { title: "Home", href: `/${type}/${pageType}` },
    { title: "English", href: `/${type}/${pageType}/english` },
    { title: "Mathematic", href: `/${type}/${pageType}/mathematic` },
    { title: "Marathi", href: `/${type}/${pageType}/marathi` },
    { title: "Science", href: `/${type}/${pageType}/science` },
  ];
  return (
    <Box
      component={"div"}
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        maxWidth: "300px",
        width: "100%",
        boxShadow: "0 0 0.1rem 0 rgba(0, 0, 0, 0.12);",
      }}
      className="h-full"
      pt={2}
    >
      <CssBaseline />
      <DrawerHeader className="capitalize">{pageType} Subjects</DrawerHeader>
      <Divider />
      <List>
        {sideBarItem.map((item, i) => {
          return (
            <ListItem key={i}>
              <Link to={item.href} className="w-full">
                <ListItemButton>
                  <ListItemText className="">{item.title}</ListItemText>
                  <ListItemIcon>
                    <ChevronRightOutlinedIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
