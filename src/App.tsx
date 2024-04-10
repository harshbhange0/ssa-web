import { Link, Route, Routes } from "react-router-dom";
import SignComponent from "./pages/auth/admin";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
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

      <Link to={"/admin/sign/in"}>Sign In</Link>
      <Link to={"/admin/sign/up"}>Sign Up</Link>

      <Routes>
        <Route path="/admin/sign/:id" element={<SignComponent />} />
      </Routes>
    </>
  );
}
