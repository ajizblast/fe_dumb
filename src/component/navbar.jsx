import Login from "./login";
import Register from "./register";
import Logo from "../images/logo.png";
import Textds from "../images/textds.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import avatar from "../images/avatar-login.png";
import AdminDropdown from "./adminDropdown";
import UserDropdown from "./userDropdown";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userState, _] = useContext(UserContext);
  const [userDropdown, setUserDropdown] = useState(false);
  return (
    <>
      <div className="absolute top-3 left-16 flex z-10">
        <img src={Logo} />
        <Link to={"/"}>
          <img src={Textds} className="h-3 mt-2 ms-2" />
        </Link>
      </div>

      {/* not login */}
      {!userState.isLogin && (
        <div className="absolute top-3 right-10 flex gap-5 z-10">
          <Login />
          <Register />
        </div>
      )}

      {/* Login */}
      {userState.isLogin && (
        <div className="absolute top-3 right-10 flex gap-5 z-10">
          <button onClick={() => setUserDropdown(!userDropdown)}>
            <img src={avatar} />
          </button>
        </div>
      )}

      {userState.user.role === "admin" && userDropdown && (
        <div className="absolute top-3 right-10 flex gap-5">
          <AdminDropdown />
        </div>
      )}

      {userState.user.role === "user" && userDropdown && (
        <div className="absolute top-3 right-10 flex gap-5">
          <UserDropdown />
        </div>
      )}
    </>
  );
};

export default Navbar;
