import { IUser } from "interface";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { State } from "state/reducers";
import SideMenu from "./Layout/SideMenu";
import "./Layout/layout.css";
import { actionCreators, store } from "state/index";
import ApiErrorModal from "./Layout/ApiErrorModal";
import { bindActionCreators } from "redux";

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
      <div className="layoutWrapper">
        <SideMenu />
        <main>
          <Outlet />
        </main>
      </div>
      {modal.showModal && (
        <ApiErrorModal message={modal.message} onClose={() => closeModal()} />
      )}
    </>
  );
};

export default Layout;
