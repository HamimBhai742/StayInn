import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const HostRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (role === "host") return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

HostRoute.propTypes = {
  children: PropTypes.element,
};

export default HostRoute;
