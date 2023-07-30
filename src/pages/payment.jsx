import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Payment = () => {
  const [state] = useContext(UserContext);
  console.log("sadias", state);

  const navigate = useNavigate();

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = import.meta.env
      .VITE_REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [state.user.id, import.meta.env.VITE_REACT_APP_MIDTRANS_CLIENT_KEY]);

  const handleBuy = useMutation(async (e) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        seller_id: state.user.id,
        price: e.price,
      };

      const body = JSON.stringify(data);

      const response = await API.post("/transaction", body, config);
      console.log("transaction success :", response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  });
  return (
    <>
      <div className="container mx-auto mt-32 ml-96">
        <div className="w-1/3 flex flex-col justify-between bg-zinc-800 shadow-md rounded-md p-3">
          <h3 className="font-bold text-md mb-5">Premium</h3>
          <p className="font-bold text-red-700 text-2xl mb-3">Rp 49.000,- </p>
          <p className="text-justify">Best plan for a month.</p>
          <button
            className="bg-red-700 text-white mt-5 py-2 rounded-md"
            onClick={() => handleBuy.mutate({ price: 49000 })}
          >
            Buy plan
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
