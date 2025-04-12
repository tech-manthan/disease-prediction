import { CssBaseline, Divider } from "@mui/material";
import { Outlet } from "react-router";
import { Footer, Navbar } from "../components";
import { useUserStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { getToken } from "../lib";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const RootLayout = () => {
  const token = getToken();
  const { setUser, user } = useUserStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/self`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        setUser(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          const msg =
            err?.response?.data?.error || "Something went wrong. Try again.";
          toast.error(msg);
        }
      }
    }

    fetchUser();
  }, [setUser, token]);

  console.log(token, user);

  return (
    <>
      <CssBaseline enableColorScheme />

      <Navbar />

      <Outlet />
      <Divider />
      <Footer />
    </>
  );
};

export default RootLayout;
