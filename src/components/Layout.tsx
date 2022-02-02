import { IUser } from "interface";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { State } from "state/reducers";
import SideMenu from "./Layout/SideMenu";
import "./Layout/layout.css"

const Layout = () => {
  let location = useLocation();
  const user = useSelector((state: State) => state.user as IUser);

  console.log(user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="layoutWrapper">
      <SideMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
