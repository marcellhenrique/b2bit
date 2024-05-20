import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;