import { useContext } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaRegUser, FaFileInvoiceDollar  } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const [_, userDispatch] = useContext(UserContext);

  const logoutUser = () => {
    userDispatch({
      type: "LOGOUT",
    });
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className="relative mt-12 left-10">
        <div className={`absolute top-full z-20 right-9 text-white mt-1`}>
          <BsFillTriangleFill />
        </div>
        <div
          className={`absolute w-40 top-full right-7 mt-4 rounded-md py-2 bg-white z-10`}
        >
          <Link
            to={"/payment"}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2"
          >
            <FaFileInvoiceDollar className="text-xl text-red-700" /> Pay
          </Link>
          <hr className="w-full h-2" />
          <Link
            onClick={logoutUser}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5"
          >
            <IoLogOut className="text-xl text-yellow-400" /> Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
