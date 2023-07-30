import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./component/navbar";
import Payment from "./pages/payment";
import ListTransaction from "./pages/listTransaction";
import AddMusic from "./pages/addMusic";
import AddArtist from "./pages/addArtist";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import {
  PrivateRouteAdmin,
  PrivateRouteLogin,
  PrivateRouteUser,
} from "./pages/privateRoute";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success: ", response);
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed: ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  return isLoading ? null : (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteLogin />}>
          <Route element={<PrivateRouteUser />}>
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/list-transactions" element={<ListTransaction />} />
            <Route path="/add-music" element={<AddMusic />} />
            <Route path="/add-artist" element={<AddArtist />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
