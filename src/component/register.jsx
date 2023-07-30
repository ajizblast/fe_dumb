import { useState } from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });

  const handleonChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/register", form);

      setForm({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        phone: "",
        address: "",
      });

      Swal.fire({
        icon: "success",
        title: "Register Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Register Failed!",
      });
      console.log("register failed : ", err);
    }
  });
  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal-3"
        className="btn bg-red-700 px-8 text-white z-10"
      >
        Register
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label htmlFor="my-modal-3" className="modal cursor-pointer">
        <label className="modal-box relative w-96 bg-black" htmlFor="">
          <h3 className="text-2xl text-white font-bold mb-2 text-center">
            Register
          </h3>
          <div className="mb-3">
            {/* <label className="text-black font-medium text-lg"> Email </label> */}
            <input
              onChange={handleonChange}
              type="email"
              name="email"
              placeholder="Email"
              className="px-5 w-full py-1 rounded bg-zinc-800 text-white"
            />
          </div>
          <div className="mb-3">
            {/* <label className="text-white font-medium text-lg">Password</label> */}
            <input
              onChange={handleonChange}
              type="password"
              name="password"
              placeholder="Password"
              className="px-5 w-full py-1 rounded bg-zinc-800  text-white"
            />
          </div>
          <div className="mb-3">
            {/* <label className="text-white font-medium text-lg">
                Full Name
              </label> */}
            <input
              onChange={handleonChange}
              name="fullname"
              type="text"
              placeholder="Full Name"
              className="px-5 w-full py-1 rounded bg-zinc-800 text-white"
            />
          </div>
          <div className="mb-3">
            {/* <label className="text-white font-medium text-lg">Gender</label> */}
            <input
              onChange={handleonChange}
              type="text"
              name="gender"
              placeholder="Gender"
              className="px-5 w-full py-1 rounded bg-zinc-800  text-white"
            />
          </div>
          <div className="mb-3">
            {/* <label className="text-white font-medium text-lg">Phone</label> */}
            <input
              onChange={handleonChange}
              type="text"
              name="phone"
              placeholder="Phone"
              className="px-5 w-full py-1 rounded bg-zinc-800  text-white"
            />
          </div>
          <div className="mb-5">
            {/* <label className="text-white font-medium text-lg">Address</label> */}
            <input
              onChange={handleonChange}
              type="text"
              name="address"
              placeholder="Address"
              className="px-5 w-full py-1 rounded bg-zinc-800  text-white"
            />
          </div>
          <div>
            <button
              onClick={(e) => handleOnSubmit.mutate(e)}
              className="w-full bg-red-700 text-white font-medium py-1 px-5 rounded"
            >
              Register
            </button>
          </div>
        </label>
      </label>
    </>
  );
};

export default Register;
