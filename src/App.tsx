import { Link, Route, Routes } from "react-router-dom";
import SignComponent from "./pages/auth/admin";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import DropdownAvatar, {
  DropdownAvatarProps,
} from "./components/DropdownAvatar";
import { useRun } from "./store/hooks";

const dropDown: { title: string; href: string }[] = [
  { title: "somthing", href: "/" },
];

export default function App() {
  const run = useRun();
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
      <div className="flex items-center justify-center">
        <DropdownAvatar run={run} settings={dropDown} />
      </div>
      <Routes>
        <Route path="/admin/sign/:id" element={<SignComponent />} />
      </Routes>
    </>
  );
}
