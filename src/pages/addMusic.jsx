import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useState } from "react";
import Swal from "sweetalert2";

const AddMusic = () => {
  const navigate = useNavigate();
  const { data: artist } = useQuery("artistCache", async () => {
    const response = await API.get("/artists");
    return response.data.data;
  });
  console.log("sattt", artist);

  const [form, setForm] = useState({
    title: "",
    year: "",
    image: "",
    song: "",
    artist_id: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };
  console.log("isdaid", form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("year", String(form.year));
      formData.set("image", form.image[0]);
      formData.set("song", form.song[0]);
      formData.set("artist_id", form.artist_id);
      console.log(formData, "iasidn");

      const response = await API.post("/music", formData, config);

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
        <h1 className="text-xl font-bold text-white">Add Music</h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="flex gap-3 mt-5">
            <input
              onChange={handleOnChange}
              name="title"
              value={form.title}
              type="text"
              placeholder="Title"
              className="w-2/3 p-1 rounded bg-zinc-700"
            />
            <label htmlFor="inputImage" className="flex">
              <input
                onChange={handleOnChange}
                type="file"
                className="w-1/3"
                id="inputImage"
                name="image"
                hidden
              />
              <p className="cursor-pointer text-red-700 bg-zinc-700 rounded px-12 p-1">
                Attach Thumbnail
              </p>
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleOnChange}
              name="year"
              value={form.year}
              type="text"
              placeholder="Year"
              className="w-full p-1 rounded bg-zinc-700"
            />
          </div>
          <div className="mt-2">
            <select
              name="artist_id"
              value={form.artist_id}
              id=""
              className="w-full p-1 rounded bg-zinc-700"
              onChange={handleOnChange}
            >
              <option value="" className="text-white hidden"></option>
              {artist?.map((index, id) => (
                <option value={index?.id} className="text-white" key={id}>
                  {index?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <label htmlFor="inputSong" className="flex">
              <input
                name="song"
                type="file"
                className="w-1/3"
                id="inputSong"
                hidden
                onChange={handleOnChange}
              />
              <p className="cursor-pointer text-red-700 bg-zinc-700 rounded px-20 p-1">
                Attach Song
              </p>
            </label>
          </div>
          <div className="text-center mt-10">
            <button className="bg-yellow-500 px-20 p-1 rounded text-white">
              Add Song
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMusic;
