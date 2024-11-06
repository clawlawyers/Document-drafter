import React, { useState } from "react";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";
const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pass, setpass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogin = async () => {
    const response = await fetch(`${NODE_API_ENDPOINT}/client/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":data.authtoken
      },
      body: JSON.stringify({
        username:phoneNumber,
        phoneNumber: "8603805697",
        verified: true,
        Password: pass,
      }),
    });
    console.log(response);
    if (response.status !== 200) {
      toast.error("invalid acreditional or error occured");
      return;
    }
    var { data } = await response.json();
    console.log(data);
    const userMongoId = data.mongoId;
    dispatch(
      login({
        phoneNumber,
        jwt: data.jwt,
        expiresAt: data.expiresAt,
        newGptUser: data.newGptUser,
        ambassador: data.ambassador,
        //   stateLocation: area ? area : data.stateLocation,
      })
    );

    navigate("/");
  };
  return (
    <div className=" h-[100vh] flex items-center justify-center">
      <div className="flex bg-white  bg-opacity-30 rounded-md flex-col w-[50%] h-[50%] gap-5 items-center justify-center">
        <input
          required
          className="px-2 py-3 w-[90%] rounded text-black"
          placeholder="Enter Your Username"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          required
          className="px-2 py-3 w-[90%] rounded text-black"
          placeholder="Enter Your Password"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />
        {/* <input></input> */}
        <button
          onClick={handlelogin}
          className="px-6 py-2 bg-customBlack font-sans rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
