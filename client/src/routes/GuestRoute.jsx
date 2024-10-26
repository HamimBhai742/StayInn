import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (role === "guest") return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

GuestRoute.propTypes = {
  children: PropTypes.element,
};

export default GuestRoute;
