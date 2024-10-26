import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};

export default AdminRoute;
