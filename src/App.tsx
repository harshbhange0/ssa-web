import { Route, Routes } from "react-router-dom";
import SignComponent from "./pages/auth";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRun, useUserType } from "./store/hooks";
import { Box } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";
import { useEffect, useState } from "react";
import Home from "./pages/home";

const dropDownItems: { title: string; href: string }[] = [
  { title: "somthing", href: "/" },
];
const navItem: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Admin", href: "/auth/admin/sign/up" },
  { title: "Student", href: "/auth/student/sign/in" },
];

export default function App() {
  const run = useRun();
  const [loading, setLoading] = useState<boolean>(true);
  const userType = useUserType();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [run]);

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
          run={run}
          navItems={navItem}
          dropDownItems={dropDownItems}
        />
        <Box
          component="main"
          sx={{ pt: { xs: "56px", sm: "64px" }, height: "100%", width: "100%" }}
        >
          {loading ? (
            "loading"
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/auth/:type/sign/:id" element={<SignComponent />} />
            </Routes>
          )}
        </Box>
      </Box>
    </>
  );
}
