import Login from "components/Login";
import NotFound from "components/NotFound";
import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import Loading from "components/shared/Loading/Loading";
import store from "store";

// lazy imports
const Layout = React.lazy(() => import("components/Layout"));
const Home = React.lazy(() => import("components/Layout/Home"));
const Gallery = React.lazy(() => import("components/Layout/Gallery"));
const Todo = React.lazy(() => import("components/Layout/Todo"));

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
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Layout />
          </Suspense>
        }
      >
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    </Routes>
  );
};

export default App;
