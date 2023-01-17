import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./firebase";
const PrivateRoutes = () => {
  auth.currentUser;
  let authUser = { token: true };
  return authUser.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
