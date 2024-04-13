export interface DrawerAppBarProps {
  navItems: { title: string; href: string }[];
  dropDownItems: { title: string; href: string }[];
  defaultNavItem: { title: string; href: string }[];
  window?: () => Window;
}

