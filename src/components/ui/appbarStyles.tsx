import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "../../store/hooks";
import { Link } from "react-router-dom";
import { DrawerProps, itemType } from "../../types/appbar_types";

export const SideDrawer = ({
  navItems,
  defaultNavItem,
  handleDrawerToggle,
}: DrawerProps) => {
  const auth = useAuth();
  return (
    /** side drawer */
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SSA 
      </Typography>
      <List>
        {/*  side drawer items  */}
        {!auth
          ? navItems?.map((item: itemType, i: any) => (
              <SideDrawerItem key={i} title={item.title} href={item.href} />
            ))
          : defaultNavItem?.map((item: itemType, i: any) => (
              <SideDrawerItem key={i} title={item.title} href={item.href} />
            ))}
      </List>
    </Box>
  );
};
const SideDrawerItem = ({ title, href }: itemType) => {
  return (
    <>
      <ListItem disablePadding>
        <Link to={href}>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={title} />
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
};
