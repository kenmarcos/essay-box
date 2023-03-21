import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Essay from "@/pages/Essay";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./route";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route path="essay/:essayId" element={<Essay />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
