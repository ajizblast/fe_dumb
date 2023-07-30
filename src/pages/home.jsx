import React, { useContext, useState } from "react";
import Jumbotron from "../images/jumbotron.png";
import CardHome from "../component/cardHome";
import MusicPlayer from "../component/musicPlayer";
import { UserContext } from "../context/userContext";

const Home = () => {
  const [music, setMusic] = useState("");
  const [state, _] = useContext(UserContext);

  const handleCard = (music) => {
    if (new Date(state.user.due_date).getTime() < new Date().getTime()) {
      alert("Waktu berlangganan habis, Bro!!");
    } else if (state.user.status_user == "active") {
      setMusic(music);
    } else {
      alert("Silakan Melakukan Pembayaran");
    }
  };
  console.log("user date", new Date(state.user.due_date).getTime());
  console.log("dushd", new Date().getTime());

  return (
    <>
      <div className="bg-black">
        <div className="w-full">
          <div className="hero min-h-full">
            <img src={Jumbotron} className="" />
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-lg">
                <h1 className="mb-5 text-4xl font-bold text-white">
                  Connect on DumbSound
                </h1>
                <p className="mb-5 text-white text-base">
                  Discovery, Stream, and share a constantly expanding mix of
                  music <br />
                  from emerging and major artists around the world
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <h2 className="text-xl text-red-500 font-medium">
              Listen and feel the purity.
            </h2>
          </div>
          <div className="mt-10 px-10 pb-10 grid grid-cols-5 gap-5">
            <CardHome onClick={handleCard} />
          </div>
          {music && <MusicPlayer music={music} />}
        </div>
      </div>
    </>
  );
};

export default Home;
