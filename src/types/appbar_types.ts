export interface DrawerAppBarProps {
  navItems: { title: string; href: string }[];
  dropDownItems: { title: string; href: string }[];
  defaultNavItem: { title: string; href: string }[];
  window?: () => Window;
}

export interface itemType {
  title: string;
  href: string;
}

export interface DrawerProps {
  navItems: itemType[];
  defaultNavItem: itemType[];
  handleDrawerToggle: () => void;
}
