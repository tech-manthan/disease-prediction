import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUserStore } from "../store/useAuthStore";

const AuthenticatedRoutes = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setChecking(false);
    }
  }, [user, navigate]);

  if (checking) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthenticatedRoutes;
