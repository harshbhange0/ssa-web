import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DrawerHeader } from "./ui/SideBarStyles";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

export default function SideBar() {
  const location = useLocation();
  const pageType = location.pathname.includes("dashboard")
    ? "dashboard"
    : "quiz";
  const type = localStorage.getItem("userType")?.toLocaleLowerCase();
  const sideBarItem: itemType[] = [
    { title: "Home", href: `/${type}/${pageType}` },
    { title: "English", href: `/${type}/${pageType}/english` },
    { title: "Mathematic", href: `/${type}/${pageType}/mathematic` },
    { title: "Marathi", href: `/${type}/${pageType}/marathi` },
    { title: "Science", href: `/${type}/${pageType}/science` },
  ];
  return (
    <div className="w-full  border-r lg:max-w-[300px]">
      <div className=" mt-10 flex w-full flex-col  items-center justify-center lg:hidden ">
        <SelectLink item={sideBarItem} />
      </div>
      <div className=" hidden flex-col lg:flex ">
        <DrawerHeader className="capitalize">{pageType} Subjects</DrawerHeader>
        <Divider />
        <List sx={{ width: "100%" }}>
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
      </div>
    </div>
  );
}

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { itemType } from "../types/appbar_types";

const SelectLink = ({ item }: { item: itemType[] }) => {
  const navigate = useNavigate();
  const handleChange = (event: SelectChangeEvent) => {
    navigate(event.target.value as string);
  };
  return (
    <FormControl sx={{ mx: "auto", width: "300px" }}>
      <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
      <Select
        variant="standard"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Subject"
        onChange={handleChange}
        defaultValue="/admin/quiz"
      >
        {item.map((itm, i) => (
          <MenuItem value={itm.href}>{itm.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
