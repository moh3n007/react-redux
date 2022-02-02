import Login from "components/Login";
import NotFound from "components/NotFound";
import Gallery from "components/Layout/Gallery";
import Home from "components/Layout/Home";
import Layout from "components/Layout";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import Loading from "components/shared/Loading/Loading";
import store from "store";
import Todo from "components/Layout/Todo";

const App = () => {
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
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
        <Route path="gallery" element={<Gallery />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    </Routes>
  );
};

export default App;
