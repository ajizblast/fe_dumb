import { useQuery } from "react-query";
import Lilsalmonela from "../images/lilsalmonela.png";
import { Await } from "react-router-dom";
import { API } from "../config/api";
import { useState } from "react";

const CardHome = (props) => {
  const { data: music } = useQuery("musicCache", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });

  console.log("ini music", music);
  return (
    <>
      {music &&
        music.map((index, id) => (
          <div
            onClick={() => props.onClick(index.song)}
            key={id}
            className="card w-56 bg-base-100 shadow-xl"
          >
            <figure>
              <img src={index?.image} alt="Shoes" className="" />
            </figure>
            <div className="card-body flex flex-row justify-between p-2">
              <div>
                <h2 className="card-title font-bold">{index?.title}</h2>
                <p>{index.artist.name}</p>
              </div>
              <div>
                <p>{index.year}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardHome;
