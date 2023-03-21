import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
