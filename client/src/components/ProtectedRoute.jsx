import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
}) {
  const userInfo = JSON.parse(
    localStorage.getItem(
      "mindmirrorUser"
    )
  );

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;