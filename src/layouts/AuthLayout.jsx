import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div className="font-poppins ">
      <header className="py-4 w-11/12 mx-auto sticky top-0">
        <Navbar></Navbar>
      </header>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
