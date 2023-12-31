import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { userLoggedIn, removeToken } from "../services/services";
export default function Header() {
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken().then((res) => {
      setLogin(false);
      toast.success("Successfully Logout!");
      navigate("/");
    });
  };
  useEffect(() => {
    userLoggedIn()
      .then((res) => {
        setLogin(true);
      })
      .catch((er) => {
        setLogin(false);
      });
  }, [location]);

  return (
    <div className="w-full h-24 p-4 text-lg text-[#11009E] font-semibold">
      <div className="flex justify-between items-center mx-8">
        <button onClick={() => navigate("/")}>
          {" "}
          Inventory Management System{" "}
        </button>
        <div className="flex gap-6">
          <button onClick={() => navigate("/generateqrcode")}>
            {" "}
            Generate QR Code{" "}
          </button>
          <button onClick={() => navigate("/scanqrcode")}>
            {" "}
            Scan QR Code{" "}
          </button>
        </div>
        <div className="gap-6 flex">
          {login ? (
            <button
              onClick={handleLogout}
              className="bg-[#11009E] text-white rounded-md py-2 px-4"
            >
              {" "}
              Logout{" "}
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="border-[#11009E] rounded-md border-2 py-2 px-4"
              >
                {" "}
                Sign in{" "}
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-[#11009E] text-white rounded-md py-2 px-4"
              >
                {" "}
                Register{" "}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
