import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "../../store/hooks";
import { Link } from "react-router-dom";
import { DrawerProps, itemType } from "../../types/appbar_types";

export const AppBarDrawer = ({
  navItems,
  defaultNavItem,
  handleDrawerToggle,
}: DrawerProps) => {
  const auth = useAuth();
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SSA
      </Typography>
      <List>
        {auth
          ? navItems?.map((item: itemType, i: any) => (
              <ListItem key={i} disablePadding>
                <Link to={item.href}>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          : defaultNavItem?.map((item: itemType, i: any) => (
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
};
