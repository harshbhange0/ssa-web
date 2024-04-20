import { Route, Routes } from "react-router-dom";
import SignComponent from "./pages/auth";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";

import Home from "./pages/home";

import Profile from "./pages/profile";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/dashboard";
import { itemType } from "./types/appbar_types";
import DisplayQuiz from "./pages/Quiz/DisplayQuiz";
import { verify } from "./utils/authAction";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authAtom, authLoaderAtom } from "./store/atom";
import CircularProgress from "@mui/material/CircularProgress";

export default function App() {
  const [loading, setLoading] = useRecoilState(authLoaderAtom);
  const userType = localStorage.getItem("userType")?.toLowerCase();
  const dropDownItems: itemType[] = [
    {
      title: "Profile",
      href: `/profile/${userType}`,
    },
  ];

  const navItem: itemType[] = [
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
  const defaultNavItem: itemType[] = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: `/${userType}/dashboard` },
    { title: "Quiz", href: `/${userType}/quiz` },
  ];
  const [auth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    getAuth();
  }, []);
  const getAuth = async () => {
    setLoading(true);
    try {
      const res = await verify();
      setAuth(res);
      setLoading(false);
    } catch (error) {
      setAuth(false);
      setLoading(false);
    }
  };
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
          component="div"
          sx={{ pt: { xs: "64px" }, height: "100%", width: "100%" }}
        >
          {/* <Box sx={{ width: "100%", position: "absolute", top: "64px" }}>
            <LinearProgress />  
          </Box> */}
          <>
            {loading ? (
              <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <CircularProgress />
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/:type/:id" element={<SignComponent />} />
                {auth && (
                  <>
                    <Route path="/profile/:type" element={<Profile />} />
                    <Route path="/:type/quiz/:subject?" element={<Quiz />} />
                    <Route
                      path="/:admin/quiz/full/:_id"
                      element={<DisplayQuiz />}
                    />
                    <Route
                      path="/:type/dashboard/:subject?"
                      element={<Dashboard />}
                    />
                    <Route path={`/admin/*`} element={<div>Not Found</div>} />
                  </>
                )}
                <Route path={"/*"} element={<div>Not Found</div>} />
              </Routes>
            )}
          </>
        </Box>
      </Box>
    </>
  );
}
