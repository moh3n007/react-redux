import Login from "components/Login";
import NotFound from "components/NotFound";
import Feed from "components/layout/Feed";
import Home from "components/layout/Home";
import Layout from "components/Layout";
import { Route, Routes } from "react-router-dom";

const App = () => {
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
