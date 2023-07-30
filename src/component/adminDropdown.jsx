import { useContext } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AdminDropdown = () => {
  const [_, userDispatch] = useContext(UserContext);

  const logoutAdmin = () => {
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
            to={"/add-music"}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2"
          >
            <FaRegUser className="text-xl text-yellow-400" /> Add Music
          </Link>
          <Link
            to={"/add-artist"}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2"
          >
            <FaRegUser className="text-xl text-yellow-400" /> Add Artist
          </Link>
          <Link
            to={"/list-transactions"}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2"
          >
            <FaRegUser className="text-xl text-yellow-400" /> list Transactions
          </Link>
          <hr className="w-full h-2" />
          <Link
            onClick={logoutAdmin}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5"
          >
            <IoLogOut className="text-xl text-yellow-400" /> Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDropdown;
