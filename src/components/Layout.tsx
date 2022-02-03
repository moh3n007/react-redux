import { IUser } from "interface";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { State } from "state/reducers";
import SideMenu from "./Layout/SideMenu";
import { actionCreators } from "state/index";
import ApiErrorModal from "./Layout/ApiErrorModal";
import { bindActionCreators } from "redux";
import { Box } from "@material-ui/core";

const Layout = () => {
  let location = useLocation();
  const user = useSelector((state: State) => state.user as IUser);
  const modal = useSelector((state: State) => state.modal);
  const dispatch = useDispatch();
  const { closeModal } = bindActionCreators(actionCreators, dispatch);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Box display="flex" width=" 100%" height="100%">
        <SideMenu />
        <Box component="main" flex={1} overflow="auto">
          <Outlet />
        </Box>
      </Box>
      {modal.showModal && (
        <ApiErrorModal message={modal.message} onClose={() => closeModal()} />
      )}
    </>
  );
};

export default Layout;
