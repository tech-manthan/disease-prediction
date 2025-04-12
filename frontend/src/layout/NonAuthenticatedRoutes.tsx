import { Outlet } from "react-router";

const NonAuthenticatedRoutes = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuthenticatedRoutes;
