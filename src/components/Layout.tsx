import { Navigate, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const authenticated = false;
  let location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <div><Outlet />layout</div>;
};

export default Layout;
