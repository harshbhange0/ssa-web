import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { useRecoilState } from "recoil";
import { sideOpenAtom } from "../store/atom";

export default function SideBarToggler() {
  const [open, setOpen] = useRecoilState(sideOpenAtom);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{ color: "#000" }}
    >
      <SettingsIcon  className=" transform hover:rotate-90 transition-transform duration-1000 ease-linear"/>
    </IconButton>
  );
}
