import { FC } from "react";
import { Link } from "react-router-dom";
import "./sidemenu.css";

interface ISideMenuItemProps {
  href: string;
}

const SideMenuItem: FC<ISideMenuItemProps> = ({ children, ...props }) => {
  const { href } = props;
  return (
    <li className="sideMenuItem">
      <Link to={href} className="sideMenuLink">
        {children}
      </Link>
    </li>
  );
};

export default SideMenuItem;
