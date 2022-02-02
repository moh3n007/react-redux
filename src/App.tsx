import Login from "components/Login";
import NotFound from "components/NotFound";
import Feed from "components/Layout/Feed";
import Home from "components/Layout/Home";
import Layout from "components/Layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import Loading from "components/shared/Loading/Loading";
import store from "store";

const App = () => {
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const savedUser = store.get("user");
    if (!!savedUser) login(savedUser, () => {});
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="feed" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default App;
