import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import Swal from "sweetalert2";

const AddArtist = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "",
    startcareer: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("age", form.age);
      formData.set("type", form.type);
      formData.set("startcareer", form.startcareer);
      console.log(formData, "iasidn");

      const response = await API.post("/artists", formData);

      // console.log(response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <div className="w-[700px] mx-auto mt-20">
        <h1 className="text-xl font-bold text-white">Add Artist</h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-5">
            <input
              onChange={handleChange}
              name="name"
              value={form.name}
              type="text"
              placeholder="Name"
              className="w-full p-1 rounded bg-zinc-700"
            />
          </div>
          <div className="mt-2">
            <input
              onChange={handleChange}
              name="age"
              value={form.age}
              type="text"
              placeholder="Old"
              className="w-full p-1 rounded bg-zinc-700"
            />
          </div>
          <div className="mt-2">
            <input
              onChange={handleChange}
              name="type"
              value={form.type}
              type="text"
              placeholder="Type"
              className="w-full p-1 rounded bg-zinc-700"
            />
          </div>
          <div className="mt-2">
            <input
              onChange={handleChange}
              name="startcareer"
              value={form.startcareer}
              type="text"
              placeholder="Start Career"
              className="w-full p-1 rounded bg-zinc-700"
            />
          </div>
          <div className="text-center mt-10">
            <button className="bg-yellow-500 px-20 p-1 rounded text-white">
              Add Artist
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddArtist;
