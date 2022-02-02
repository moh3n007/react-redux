import { Link } from "react-router-dom";
import "./SideMenu/sidemenu.css";
import SideMenuItem from "./SideMenu/SideMenuItem";

const SideMenu = () => {
  return (
    <aside className="sideMenu">
      <ul className="sideMenuList">
        <SideMenuItem href="/">Home</SideMenuItem>
        <SideMenuItem href="/gallery">Gallery</SideMenuItem>
        <SideMenuItem href="/todo">Todo</SideMenuItem>
      </ul>
    </aside>
  );
};

export default SideMenu;
