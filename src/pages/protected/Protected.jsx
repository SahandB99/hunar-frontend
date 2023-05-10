import { Navigate, Outlet } from "react-router";

const Protected = ({ user, role }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) return <Navigate to="/403" replace />;
  return <Outlet />;
};

export default Protected;
