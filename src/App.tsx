import { Route, Routes, useParams } from "react-router-dom";
import SignComponent from "./pages/auth";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, LinearProgress } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import { useRecoilState } from "recoil";
import { authAtom } from "./store/atom";
import axios from "axios";
import { useAuthRun } from "./store/hooks";
import Profile from "./pages/profile";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/dashboard";

export default function App() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const userType = localStorage.getItem("userType")?.toLowerCase();
  const dropDownItems: { title: string; href: string }[] = [
    {
      title: "Profile",
      href: `/profile/${userType}`,
    },
  ];

  const navItem: { title: string; href: string }[] = [
    { title: "Home", href: "/" },
    {
      title: userType == "admin" ? userType : "Admin",
      href: "/auth/admin/sign-up",
    },
    {
      title: userType == "student" ? userType : "Student",
      href: "/auth/student/sign-up",
    },
  ];
  const defaultNavItem: { title: string; href: string }[] = [
    {
      title: "Home",
      href: "/",
    },
    { title: "Dashboard", href: `/dashboard/${userType}` },
    { title: "Quiz", href: `/quiz/${userType}` },
  ];

  const [loading, setLoading] = useState<boolean>(true);
  const getAuth = async () => {
    const token = localStorage.getItem("authorization");
    const type = localStorage.getItem("userType");

    try {
      if (!token) {
        setAuth(false);
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${type == "Admin" ? "admin" : "user"}/verify`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setAuth(res.data.data.auth);
    } catch (error) {
      console.log(error);
    }
  };
  const authRun = useAuthRun();
  useEffect(() => {
    getAuth();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [authRun]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <Box component={"div"} sx={{ width: "100%" }}>
        <DrawerAppBar
          defaultNavItem={defaultNavItem}
          navItems={navItem}
          dropDownItems={dropDownItems}
        />
        <Box
          component="main"
          sx={{ pt: { xs: "56px", sm: "64px" }, height: "100%", width: "100%" }}
        >
          {loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/auth/:type/:id"} element={<SignComponent />} />
              <Route path={"/profile/:type"} element={<Profile />} />
              <Route path={"/quiz/:type"} element={<Quiz />} />
              <Route path={"/dashboard/:type"} element={<Dashboard />} />
            </Routes>
          )}
        </Box>
      </Box>
    </>
  );
}
